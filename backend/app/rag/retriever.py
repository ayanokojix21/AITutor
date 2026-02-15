"""
Multi-stage retrieval pipeline for Eduverse RAG.

Pipeline:  MMR base  →  Multi-Query expansion  →  Deduplication  →  FlashRank reranking

All components are LangChain built-ins except the lightweight deduplicator:
  - MultiQueryRetriever           (query expansion via LLM)
  - FlashrankRerank               (local cross-encoder reranker — free, no API)
  - ContextualCompressionRetriever (wraps reranker around any retriever)
"""

import logging
from typing import List, Optional

from langchain_classic.retrievers.contextual_compression import (
    ContextualCompressionRetriever,
)
from langchain_classic.retrievers.multi_query import MultiQueryRetriever
from langchain_community.document_compressors.flashrank_rerank import FlashrankRerank
from langchain_core.callbacks import CallbackManagerForRetrieverRun
from langchain_core.documents import Document
from langchain_core.retrievers import BaseRetriever
from langchain_groq import ChatGroq

from app.core.config import settings
from app.rag.vector_store import EduverseVectorStore

logger = logging.getLogger(__name__)


# ── Deduplication Retriever ───────────────────────────────────────────
# MultiQueryRetriever generates 3 query variations, often returning
# the same chunks. This wrapper deduplicates by page_content hash
# before passing to the reranker.

class _DeduplicatingRetriever(BaseRetriever):
    """Wraps a retriever and deduplicates results by content hash."""

    base_retriever: BaseRetriever

    class Config:
        arbitrary_types_allowed = True

    def _get_relevant_documents(
        self,
        query: str,
        *,
        run_manager: CallbackManagerForRetrieverRun,
    ) -> List[Document]:
        docs = self.base_retriever.invoke(query)
        seen = set()
        unique = []
        for doc in docs:
            content_hash = hash(doc.page_content)
            if content_hash not in seen:
                seen.add(content_hash)
                unique.append(doc)
        logger.debug(
            f"Deduplication: {len(docs)} → {len(unique)} documents"
        )
        return unique


def build_retriever(
    user_id: str,
    groq_api_key: str,
    course_id: Optional[str] = None,
) -> BaseRetriever:
    """
    Build the full retrieval pipeline for a user.

    Args:
        user_id:      Authenticated user ID (selects their pgvector collection).
        groq_api_key: User-provided Groq key for multi-query expansion.
        course_id:    Optional — restrict retrieval to one course.

    Returns:
        A LangChain retriever that:
          1. Retrieves via MMR (diverse results)
          2. Expands the query into 3 variations (MultiQueryRetriever)
          3. Deduplicates overlapping results
          4. Reranks with FlashRank cross-encoder (local, free)
    """

    # ── Step 1: Base retriever (MMR for diversity) ─────────────────────
    vs = EduverseVectorStore(user_id=user_id)

    # Pre-check: if collection is empty, log a warning
    info = vs.collection_info()
    if info["count"] == 0:
        logger.warning(
            f"User {user_id} has an empty collection — "
            f"queries will return no results"
        )

    search_kwargs = {
        "k": settings.RAG_RETRIEVER_K * 2,     # fetch more for reranking
        "fetch_k": settings.RAG_RETRIEVER_FETCH_K,
    }
    if course_id:
        search_kwargs["filter"] = {"course_id": course_id}

    base_retriever = vs.get_retriever(
        search_type="mmr",
        search_kwargs=search_kwargs,
    )
    logger.debug(
        f"Base retriever: MMR, k={search_kwargs['k']}, "
        f"fetch_k={search_kwargs['fetch_k']}, course_id={course_id}"
    )

    # ── Step 2: Multi-query expansion ──────────────────────────────────
    expansion_llm = ChatGroq(
        model="llama-3.1-8b-instant",
        api_key=groq_api_key,
        temperature=0,
        max_tokens=256,
    )

    multi_query_retriever = MultiQueryRetriever.from_llm(
        retriever=base_retriever,
        llm=expansion_llm,
    )
    logger.debug("Multi-query retriever created (3 query variations)")

    # ── Step 3: Deduplicate ────────────────────────────────────────────
    deduped_retriever = _DeduplicatingRetriever(
        base_retriever=multi_query_retriever,
    )

    # ── Step 4: FlashRank reranking (local cross-encoder) ──────────────
    reranker = FlashrankRerank(top_n=settings.RAG_RERANK_TOP_N)

    final_retriever = ContextualCompressionRetriever(
        base_compressor=reranker,
        base_retriever=deduped_retriever,
    )
    logger.info(
        f"Retrieval pipeline built: MMR → MultiQuery → Dedup → "
        f"FlashRank(top_n={settings.RAG_RERANK_TOP_N})"
    )

    return final_retriever
