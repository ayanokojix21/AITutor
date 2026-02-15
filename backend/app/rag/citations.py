"""
Citation extraction for Eduverse RAG.

Parses [1], [2], [N] references from the LLM answer and maps them
back to the source documents returned by the retrieval chain.
"""

import re
from typing import Dict, List, Optional

from langchain_core.documents import Document


def extract_citations(
    answer: str,
    source_docs: List[Document],
) -> List[Dict]:
    """
    Extract citation references from an answer and map to source documents.

    The LLM is prompted to cite sources as [1], [2], etc.  This function
    finds all such references in the answer text and returns metadata
    for each cited source.

    Args:
        answer:      The LLM-generated answer containing [N] references.
        source_docs: The retrieved documents (ordered by retrieval rank).

    Returns:
        List of citation dicts, each containing:
          - number:      The citation number (1-indexed)
          - file_name:   Original file name
          - source_type: "pdf", "video", "audio", "image"
          - page_number: Page number (for PDFs), or None
          - start_time:  Start timestamp in seconds (for audio/video), or None
          - end_time:    End timestamp in seconds, or None
          - text_snippet: First 200 chars of the source chunk
    """
    if not answer or not source_docs:
        return []

    # Find all [N] references in the answer
    raw_refs = re.findall(r"\[(\d+)\]", answer)
    if not raw_refs:
        return []

    # Deduplicate while preserving order of first appearance
    seen = set()
    unique_refs = []
    for ref in raw_refs:
        if ref not in seen:
            seen.add(ref)
            unique_refs.append(int(ref))

    citations = []
    for ref_num in sorted(unique_refs):
        idx = ref_num - 1  # Convert 1-indexed to 0-indexed
        if 0 <= idx < len(source_docs):
            doc = source_docs[idx]
            meta = doc.metadata

            citations.append({
                "number": ref_num,
                "source_id": meta.get("source_id"),
                "file_name": meta.get("file_name", "unknown"),
                "source_type": meta.get("source_type", "unknown"),
                "page_number": meta.get("page_number"),
                "start_time": meta.get("start_time"),
                "end_time": meta.get("end_time"),
                "text_snippet": doc.page_content[:200],
            })

    return citations
