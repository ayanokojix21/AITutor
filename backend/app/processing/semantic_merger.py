"""
Semantic chunking with contextual prefixes and parent-child storage.

Improvements over basic chunking:
1. Context prefix: Each chunk starts with "[From file.pdf, page 2]"
   so the embedding captures WHERE the content comes from.
2. Parent-child: Small chunks (300 chars) for precise retrieval,
   full parent content (800 chars) stored in metadata for richer LLM context.
3. Document type: Auto-detected from filename (lab/assignment/exam/lecture).
"""

import logging
import uuid
from typing import List, Optional

from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

logger = logging.getLogger(__name__)


class SemanticMerger:
    """Chunks and normalizes documents with contextual enrichment."""

    def __init__(self, chunk_size: int = 300, chunk_overlap: int = 50):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=["\n\n", "\n", ". ", " ", ""],
        )

    def merge_and_chunk(
        self,
        documents: List[Document],
        course_id: Optional[str] = None,
        course_name: Optional[str] = None,
    ) -> List[Document]:
        """
        Split documents into contextually-enriched chunks.

        Each chunk gets:
          - A context prefix (file name, page number)
          - Parent content in metadata (for richer LLM answers)
          - Normalized metadata with document_type
        """
        if not documents:
            return []

        all_chunks = []
        for doc in documents:
            # Build context prefix from metadata
            prefix = self._build_prefix(doc.metadata)

            # Store original content as parent (truncated to 800 chars)
            parent_content = doc.page_content[:800]

            # Split into small child chunks
            children = self.splitter.split_text(doc.page_content)

            for child_text in children:
                # Prepend context prefix to chunk content
                enriched_content = f"{prefix}{child_text}"

                # Build normalized metadata with parent content
                meta = self._normalize(doc.metadata, course_id, course_name)
                meta["parent_content"] = parent_content

                all_chunks.append(Document(
                    page_content=enriched_content,
                    metadata=meta,
                ))

        logger.info(f"Merged {len(documents)} docs → {len(all_chunks)} chunks (contextual)")
        return all_chunks

    def _build_prefix(self, meta: dict) -> str:
        """Build a context prefix like '[From LAB 1.pdf, page 2] '."""
        parts = [meta.get("file_name", "unknown")]
        if page := meta.get("page_number"):
            parts.append(f"page {page}")
        return f"[From {', '.join(parts)}] "

    def _normalize(
        self, meta: dict, course_id: Optional[str], course_name: Optional[str]
    ) -> dict:
        """Ensure every chunk conforms to the fixed vector schema."""
        return {
            "source_type": meta.get("source_type", "unknown"),
            "source_id": meta.get("source_id", str(uuid.uuid4())),
            "file_name": meta.get("file_name", "unknown"),
            "course_id": course_id or meta.get("course_id"),
            "course_name": course_name or meta.get("course_name"),
            "page_number": meta.get("page_number"),
            "total_pages": meta.get("total_pages"),
            "start_time": meta.get("start_time"),
            "end_time": meta.get("end_time"),
            "contains_visual": meta.get("contains_visual", False),
            "document_type": self._detect_doc_type(meta.get("file_name", "")),
        }

    @staticmethod
    def _detect_doc_type(file_name: str) -> str:
        """Auto-detect document type from filename."""
        name = file_name.lower()
        if any(k in name for k in ("lab", "practical")):
            return "lab"
        if any(k in name for k in ("assign", "homework", "hw")):
            return "assignment"
        if any(k in name for k in ("quiz", "exam", "test", "midterm", "final")):
            return "exam"
        if any(k in name for k in ("lect", "slide", "note", "chapter")):
            return "lecture"
        return "document"