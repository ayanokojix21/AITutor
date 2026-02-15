"""
Async database engine and session management.

Uses PostgreSQL via asyncpg with direct connection to Supabase
(bypasses the Supavisor pooler). Direct connection supports all
asyncpg features including prepared statements.
"""

import ssl
from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base

from app.core.config import settings

# ── SSL context for Supabase ─────────────────────────────────────────
# Supabase requires TLS for all external connections.
_ssl_context = ssl.create_default_context()
_ssl_context.check_hostname = False
_ssl_context.verify_mode = ssl.CERT_NONE

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
    pool_recycle=300,
    connect_args={
        "ssl": _ssl_context,                       # Supabase: TLS required
        "command_timeout": 60,                     # asyncpg client-side timeout
        "server_settings": {
            "statement_timeout": "60000",           # 60s (Supabase default can be low)
        },
    },
)

AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

Base = declarative_base()


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """FastAPI dependency that provides a DB session with auto-commit/rollback."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def init_db():
    """Create all tables on startup."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def close_db():
    """Close database connections on shutdown."""
    await engine.dispose()
