"""
Session-based chat memory for Eduverse RAG.

Uses PostgresChatMessageHistory from langchain-postgres for persistent,
concurrent-safe session storage. Sessions survive server restarts.

Sessions are keyed by a string ID (typically "{user_id}_{uuid}").
"""

import logging
from typing import Dict, List

import psycopg
from langchain_core.messages import BaseMessage
from langchain_postgres import PostgresChatMessageHistory
from sqlalchemy import text, create_engine

from app.core.config import settings

logger = logging.getLogger(__name__)

# ── Shared sync engine for session listing queries ────────────────────
_sync_engine = None


def _get_sync_engine():
    """Get or create a shared SQLAlchemy sync engine."""
    global _sync_engine
    if _sync_engine is None:
        _sync_engine = create_engine(
            settings.PG_SYNC_URL,
            pool_pre_ping=True,
            pool_size=2,
            max_overflow=3,
        )
    return _sync_engine


# ── Table creation (one-time) ─────────────────────────────────────────
_table_created = False


def _ensure_table():
    """Create the chat_history table if it doesn't exist (idempotent)."""
    global _table_created
    if _table_created:
        return

    # PostgresChatMessageHistory needs a psycopg connection to create table
    try:
        PostgresChatMessageHistory.create_tables(
            psycopg.connect(settings.PG_CONNINFO), table_name="chat_history"
        )
        _table_created = True
        logger.info("Chat history table ensured")
    except Exception as e:
        logger.warning(f"Could not create chat_history table (may already exist): {e}")
        _table_created = True  # Don't retry on every call


def get_session_history(session_id: str) -> PostgresChatMessageHistory:
    """
    Get or create a PostgresChatMessageHistory for the given session.

    This function is passed directly to RunnableWithMessageHistory
    as the `get_session_history` callable.

    Args:
        session_id: Unique session identifier.

    Returns:
        PostgresChatMessageHistory instance for the session.
    """
    _ensure_table()

    conn = psycopg.connect(settings.PG_CONNINFO)

    return PostgresChatMessageHistory(
        table_name="chat_history",
        session_id=session_id,
        sync_connection=conn,
    )


def get_session_messages(session_id: str) -> List[Dict]:
    """
    Get all messages for a session as serializable dicts.

    Returns:
        List of {"role": "human"|"ai", "content": "..."} dicts.
        Empty list if session doesn't exist.
    """
    history = get_session_history(session_id)
    messages: List[BaseMessage] = history.messages

    return [
        {
            "role": "human" if msg.type == "human" else "ai",
            "content": msg.content,
        }
        for msg in messages
    ]


def clear_session(session_id: str) -> bool:
    """
    Clear a session's history.

    Returns:
        True if session was cleared (always True with PostgreSQL backend).
    """
    history = get_session_history(session_id)
    history.clear()
    logger.info(f"Cleared chat session: {session_id}")
    return True


def list_user_sessions(user_id: str) -> List[str]:
    """
    List all active session IDs for a user.

    Queries the chat_history table for distinct session_ids
    matching the user's prefix.
    """
    try:
        engine = _get_sync_engine()
        with engine.connect() as conn:
            result = conn.execute(
                text(
                    "SELECT DISTINCT session_id FROM chat_history "
                    "WHERE session_id LIKE :prefix"
                ),
                {"prefix": f"{user_id}_%"},
            )
            sessions = [row[0] for row in result]
        return sessions
    except Exception as e:
        logger.warning(f"Could not list sessions: {e}")
        return []
