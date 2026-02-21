"""
Session-based chat memory for Eduverse RAG.

Uses PostgresChatMessageHistory from langchain-postgres for persistent,
concurrent-safe session storage. Sessions survive server restarts.

Sessions are keyed by a string ID (typically "{user_id}_{uuid}").

Connection management:
  - Sync psycopg connections for PostgresChatMessageHistory
  - chain.invoke() is used (not ainvoke) to stay sync-compatible
  - asyncio.to_thread() in chat.py keeps the event loop free
"""

import logging
import uuid as _uuid
from typing import Dict, List, Optional

import psycopg
from psycopg_pool import ConnectionPool
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


# ── Connection pool for sync operations ───────────────────────────────
_pool: Optional[ConnectionPool] = None


def _get_pool() -> ConnectionPool:
    """Get or create the psycopg connection pool for sync operations."""
    global _pool
    if _pool is None:
        _pool = ConnectionPool(
            settings.PG_CONNINFO,
            min_size=1,
            max_size=5,
            open=True,
        )
    return _pool


# ── Table creation (one-time) ─────────────────────────────────────────
_table_created = False


def _ensure_table():
    """Create the chat_history table if it doesn't exist (idempotent)."""
    global _table_created
    if _table_created:
        return

    try:
        with _get_pool().connection() as conn:
            # Both args are positional-only in v0.0.16:
            # create_tables(connection, table_name, /)
            PostgresChatMessageHistory.create_tables(conn, "chat_history")
        _table_created = True
        logger.info("Chat history table ensured")
    except Exception as e:
        logger.warning(f"Could not create chat_history table (may already exist): {e}")
        _table_created = True


def _to_session_uuid(session_id: str) -> str:
    """Convert app-format session ID to a valid UUID string.

    v0.0.16 requires session_id to be a valid UUID.
    Deterministically derives a UUID5 so the same session_id
    always maps to the same UUID.
    """
    return str(_uuid.uuid5(_uuid.NAMESPACE_DNS, session_id))


# ── Session history factory (SYNC — required by RunnableWithMessageHistory) ──

def get_session_history(session_id: str) -> PostgresChatMessageHistory:
    """
    Get or create a PostgresChatMessageHistory for the given session.

    MUST be sync — RunnableWithMessageHistory in the installed
    langchain-core version does NOT await async callables.

    Uses sync psycopg.Connection. The chain must be invoked with
    chain.invoke() (not ainvoke), wrapped in asyncio.to_thread()
    in the FastAPI endpoint to keep the event loop free.

    Args:
        session_id: Unique session identifier (app format).

    Returns:
        PostgresChatMessageHistory with sync connection.
    """
    _ensure_table()
    session_uuid = _to_session_uuid(session_id)

    conn = psycopg.connect(settings.PG_CONNINFO, autocommit=True)

    return PostgresChatMessageHistory(
        # v0.0.16: __init__(table_name, session_id, /) — positional-only
        "chat_history",
        session_uuid,
        sync_connection=conn,
    )


# ── Sync utilities (for REST endpoints) ──────────────────────────────

def get_session_messages(session_id: str) -> List[Dict]:
    """
    Get all messages for a session as serializable dicts.

    Returns:
        List of {"role": "human"|"ai", "content": "..."} dicts.
        Empty list if session doesn't exist.
    """
    session_uuid = _to_session_uuid(session_id)
    _ensure_table()

    conn = psycopg.connect(settings.PG_CONNINFO, autocommit=True)
    try:
        history = PostgresChatMessageHistory(
            "chat_history", session_uuid, sync_connection=conn,
        )
        messages: List[BaseMessage] = history.messages

        return [
            {
                "role": "human" if msg.type == "human" else "ai",
                "content": msg.content,
            }
            for msg in messages
        ]
    finally:
        conn.close()


def clear_session(session_id: str) -> bool:
    """
    Clear a session's history.

    Returns:
        True if session was cleared.
    """
    session_uuid = _to_session_uuid(session_id)
    _ensure_table()

    conn = psycopg.connect(settings.PG_CONNINFO, autocommit=True)
    try:
        history = PostgresChatMessageHistory(
            "chat_history", session_uuid, sync_connection=conn,
        )
        history.clear()
        logger.info(f"Cleared chat session: {session_id}")
        return True
    finally:
        conn.close()


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
