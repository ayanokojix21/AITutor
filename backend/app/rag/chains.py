"""
Core RAG chain for Eduverse.

Pure LCEL pipeline that gives full control over document formatting,
ensuring numbered [1], [2], [3] context labels for reliable citations.

Pipeline:
  1. History-aware retriever (reformulates follow-ups)
  2. format_docs_with_ids (numbers docs [1], [2], etc.)
  3. QA prompt + LLM → answer with citations
  4. RunnableWithMessageHistory (per-session memory)
"""

import logging
from typing import Any, Dict, Optional

from langchain_classic.chains.history_aware_retriever import create_history_aware_retriever
from langchain_core.documents import Document
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableLambda, RunnablePassthrough
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_groq import ChatGroq

from app.core.config import settings
from app.rag.memory import get_session_history
from app.rag.prompts import contextualize_prompt, format_docs_with_ids, qa_prompt
from app.rag.retriever import build_retriever

logger = logging.getLogger(__name__)


def build_rag_chain(
    user_id: str,
    groq_api_key: str,
    course_id: Optional[str] = None,
) -> RunnableWithMessageHistory:
    """
    Build the full conversational RAG chain for a user.

    Uses pure LCEL instead of create_retrieval_chain so we:
      1. Control document formatting (numbered [1], [2] labels)
      2. Preserve context docs in output for citation extraction

    Args:
        user_id:      Authenticated user ID.
        groq_api_key: User-provided Groq API key.
        course_id:    Optional course filter.

    Returns:
        RunnableWithMessageHistory that accepts:
            {"input": "user question"}
        and returns:
            {"answer": "...", "context": [Document, ...]}
    """

    # ── LLM for answer generation ─────────────────────────────────────
    llm = ChatGroq(
        model=settings.RAG_LLM_MODEL,
        api_key=groq_api_key,
        temperature=settings.RAG_LLM_TEMPERATURE,
        max_tokens=2048,
    )

    # ── Retriever pipeline (MMR → MultiQuery → Dedup → FlashRank) ────
    retriever = build_retriever(
        user_id=user_id,
        groq_api_key=groq_api_key,
        course_id=course_id,
    )

    # ── Step 1: History-aware retriever ───────────────────────────────
    #   Reformulates follow-up questions using chat history so the
    #   retriever always gets a standalone query.
    history_aware_retriever = create_history_aware_retriever(
        llm=llm,
        retriever=retriever,
        prompt=contextualize_prompt,
    )

    qa_answer_chain = qa_prompt | llm | StrOutputParser()

    # Full pipeline: retrieve → format → answer, preserving context
    rag_chain = (
        RunnablePassthrough.assign(
            # Step 2a: Retrieve documents (history-aware)
            context=lambda x: history_aware_retriever.invoke(x),
        )
        | RunnablePassthrough.assign(
            # Step 2b: Format docs with [1], [2] numbering for the prompt
            # while keeping original docs in "context" for citations
            answer=lambda x: qa_answer_chain.invoke({
                "input": x["input"],
                "chat_history": x.get("chat_history", []),
                "context": format_docs_with_ids(x["context"]),
            }),
        )
    )

    # ── Step 3: Wrap with session memory ──────────────────────────────
    conversational_chain = RunnableWithMessageHistory(
        rag_chain,
        get_session_history,
        input_messages_key="input",
        history_messages_key="chat_history",
        output_messages_key="answer",
    )

    logger.info(
        f"RAG chain built for user={user_id}, "
        f"model={settings.RAG_LLM_MODEL}, course_id={course_id}"
    )
    return conversational_chain
