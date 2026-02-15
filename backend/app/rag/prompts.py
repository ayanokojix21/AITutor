"""
Citation-aware prompt templates for the Eduverse RAG system.

Uses LangChain ChatPromptTemplate with MessagesPlaceholder
for seamless integration with create_history_aware_retriever
and create_stuff_documents_chain.
"""

from typing import List

from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder


# ---------------------------------------------------------------------------
# 1.  Contextualize Prompt
#     Used by create_history_aware_retriever to reformulate
#     follow-up questions into standalone queries.
# ---------------------------------------------------------------------------

CONTEXTUALIZE_SYSTEM = (
    "Given the chat history and the latest user question, "
    "reformulate the question so it can be understood WITHOUT the chat history. "
    "Do NOT answer the question — only reformulate it if needed, "
    "otherwise return it as-is."
)

contextualize_prompt = ChatPromptTemplate.from_messages([
    ("system", CONTEXTUALIZE_SYSTEM),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
])


# ---------------------------------------------------------------------------
# 2.  QA Prompt  (citation-aware)
#     Used by create_stuff_documents_chain to generate the final answer.
#     The {context} variable is injected automatically by the chain.
# ---------------------------------------------------------------------------

QA_SYSTEM = (
    "You are **Eduverse**, an intelligent educational assistant. "
    "Answer the student's question using ONLY the provided context below.\n\n"
    "## CITATION RULES (MANDATORY)\n"
    "- Each source in the context is labeled [1], [2], [3], etc.\n"
    "- You MUST cite sources using ONLY these exact numbers: [1], [2], [3], [4], [5].\n"
    "- Place citations IMMEDIATELY after the claim they support.\n"
    "- Example: 'Gradient descent minimizes the loss function [1]. "
    "The learning rate controls step size [2].'\n"
    "- NEVER use labels like [Q1], [Instructions], [18], [Evaluation Scheme], "
    "or any text inside brackets — ONLY numeric source references [1], [2], etc.\n"
    "- NEVER use ranges like [1-3] — always list individually: [1] [2] [3].\n\n"
    "## ANSWER RULES\n"
    "- If the context is insufficient, say: "
    '"I don\'t have enough information in your course materials to answer that."\n'
    "- Never fabricate information not present in the context.\n"
    "- For audio/video sources, mention the timestamp range when relevant.\n"
    "- Keep answers clear, well-structured, and educational.\n\n"
    "Context:\n{context}"
)

qa_prompt = ChatPromptTemplate.from_messages([
    ("system", QA_SYSTEM),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
])


# ---------------------------------------------------------------------------
# 3.  Document Formatter
#     Formats retrieved documents as numbered context blocks so the LLM
#     can reference them by index [1], [2], etc.
# ---------------------------------------------------------------------------

def format_docs_with_ids(docs: List[Document]) -> str:
    """
    Format a list of Documents into a numbered context string.

    Example output::

        [1] (source: lecture.pdf, page 3)
        Backpropagation uses the chain rule to compute gradients...

        [2] (source: video.mp4, 01:30–02:00)
        [AUDIO] The professor explains gradient descent...

    This is used as a custom document_prompt in the stuff chain
    so citations match positional numbers.
    """
    blocks = []
    for i, doc in enumerate(docs, start=1):
        meta = doc.metadata
        source_parts = []

        file_name = meta.get("file_name", "unknown")
        source_parts.append(f"source: {file_name}")

        page = meta.get("page_number")
        if page is not None:
            source_parts.append(f"page {page}")

        start = meta.get("start_time")
        end = meta.get("end_time")
        if start is not None:
            time_str = _format_time(start)
            if end is not None:
                time_str += f"–{_format_time(end)}"
            source_parts.append(time_str)

        header = f"[{i}] ({', '.join(source_parts)})"
        blocks.append(f"{header}\n{doc.page_content}")

    return "\n\n".join(blocks)


def _format_time(seconds: float) -> str:
    """Convert seconds to MM:SS format."""
    mins, secs = divmod(int(seconds), 60)
    return f"{mins:02d}:{secs:02d}"
