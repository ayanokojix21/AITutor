"""
Chat API endpoints for Eduverse RAG.

Provides three endpoints:
  POST   /chat/query              → Ask a question, get answer + citations
  GET    /chat/history/{session}  → Retrieve conversation history
  DELETE /chat/session/{session}  → Clear a session's memory
"""

import logging
import uuid
from datetime import datetime, timezone
from typing import List, Optional

from fastapi import APIRouter, Depends, Header, HTTPException, status
from pydantic import BaseModel, ConfigDict
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.routes.auth import get_current_user
from app.core.database import get_db
from app.models.database import User
from app.rag.chains import build_rag_chain
from app.rag.citations import extract_citations
from app.rag.memory import clear_session, get_session_messages
from app.rag.vector_store import EduverseVectorStore

logger = logging.getLogger(__name__)
router = APIRouter()


# ─── Request / Response Models ────────────────────────────────────────

class QueryRequest(BaseModel):
    """Request body for the chat query endpoint."""

    question: str
    session_id: Optional[str] = None
    course_id: Optional[str] = None


class CitationResponse(BaseModel):
    """A single citation reference."""

    model_config = ConfigDict(from_attributes=True)

    number: int
    source_id: Optional[str] = None
    file_name: str
    source_type: str
    page_number: Optional[int] = None
    start_time: Optional[float] = None
    end_time: Optional[float] = None
    text_snippet: str


class QueryResponse(BaseModel):
    """Response from the chat query endpoint."""

    answer: str
    citations: List[CitationResponse]
    session_id: str
    sources_used: int


class MessageResponse(BaseModel):
    """A single chat message."""

    role: str
    content: str


class HistoryResponse(BaseModel):
    """Response from the chat history endpoint."""

    session_id: str
    messages: List[MessageResponse]
    message_count: int


# ─── Endpoints ────────────────────────────────────────────────────────

@router.post("/query", response_model=QueryResponse)
async def chat_query(
    request: QueryRequest,
    x_groq_api_key: str = Header(..., alias="X-Groq-Api-Key"),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Send a question and receive a citation-grounded answer.

    The RAG pipeline retrieves relevant chunks from the user's
    indexed materials, then generates an answer with [1], [2], etc.
    citations mapped to source documents.

    **Headers required**:
      - `Authorization: Bearer <jwt>`
      - `X-Groq-Api-Key: gsk_...`

    **Optional fields**:
      - `session_id`: Reuse a session for follow-up questions.
        Auto-generated if omitted.
      - `course_id`: Restrict retrieval to one course's materials.
    """
    # ── Validate API key format ───────────────────────────────────
    if not x_groq_api_key or not x_groq_api_key.startswith("gsk_"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Groq API key. Must start with 'gsk_'.",
        )

    if not request.question.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Question cannot be empty.",
        )

    # ── Session management ────────────────────────────────────────
    session_id = request.session_id or f"{user.id}_{uuid.uuid4().hex[:12]}"

    # ── Pre-check: does user have any indexed documents? ──────────
    vs = EduverseVectorStore(user_id=user.id)
    info = vs.collection_info()
    if info["count"] == 0:
        return QueryResponse(
            answer="You haven't indexed any documents yet. "
                   "Please upload and index files first using the "
                   "/indexing/file/{file_id} endpoint.",
            citations=[],
            session_id=session_id,
            sources_used=0,
        )

    try:
        # ── Build and invoke chain ────────────────────────────────
        chain = build_rag_chain(
            user_id=user.id,
            groq_api_key=x_groq_api_key,
            course_id=request.course_id,
        )

        result = await chain.ainvoke(
            {"input": request.question},
            config={"configurable": {"session_id": session_id}},
        )

        answer = result.get("answer", "I could not generate a response.")
        context_docs = result.get("context", [])

        # ── Extract citations ─────────────────────────────────────
        citations = extract_citations(answer, context_docs)

        logger.info(
            f"Chat query completed: user={user.id}, "
            f"session={session_id}, "
            f"sources={len(context_docs)}, "
            f"citations={len(citations)}"
        )

        return QueryResponse(
            answer=answer,
            citations=[CitationResponse(**c) for c in citations],
            session_id=session_id,
            sources_used=len(context_docs),
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Chat query failed: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Query failed: {str(e)}",
        )


@router.get("/history/{session_id}", response_model=HistoryResponse)
async def chat_history(
    session_id: str,
    user: User = Depends(get_current_user),
):
    """
    Get conversation history for a session.

    Returns all human/AI message pairs stored in memory
    for the given session.
    """
    # Security: ensure session belongs to user
    if not session_id.startswith(user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only access your own sessions.",
        )

    messages = get_session_messages(session_id)

    return HistoryResponse(
        session_id=session_id,
        messages=[MessageResponse(**m) for m in messages],
        message_count=len(messages),
    )


@router.delete("/session/{session_id}")
async def delete_session(
    session_id: str,
    user: User = Depends(get_current_user),
):
    """
    Clear a session's conversation history.

    Frees memory and resets the chat context for the session.
    """
    # Security: ensure session belongs to user
    if not session_id.startswith(user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own sessions.",
        )

    cleared = clear_session(session_id)

    if not cleared:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Session '{session_id}' not found.",
        )

    return {
        "message": f"Session '{session_id}' cleared.",
        "session_id": session_id,
    }
