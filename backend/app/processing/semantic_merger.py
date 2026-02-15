import logging
import uuid
from typing import List, Optional

from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

logger = logging.getLogger(__name__)

class SemanticMerger:
    """Chunks and normalizes documents from all processors for vector store."""

    def __init__(self, chunk_size: int = 500, chunk_overlap: int = 100):
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
        """Split documents into chunks, normalize metadata schema."""
        if not documents:
            return []

        chunked = self.splitter.split_documents(documents)

        for doc in chunked:
            doc.metadata = self._normalize(doc.metadata, course_id, course_name)

        logger.info(f"Merged {len(documents)} docs → {len(chunked)} chunks")
        return chunked

    def _normalize(self, meta: dict, course_id: Optional[str], course_name: Optional[str]) -> dict:
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
        }