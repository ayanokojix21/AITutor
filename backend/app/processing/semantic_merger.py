from typing import List, Dict
from langchain.text_splitter import RecursiveCharacterTextSplitter
from app.processing.text_cleaner import clean_text

class SemanticMerger:
    def __init__(self, chunk_size=1000, chunk_overlap=200):
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=["\n\n", "\n", ". ", " ", ""]
        )

    def merge_and_chunk(self, sources: List[Dict[str, str]]) -> List[Dict[str, str]]:
        """
        Merges text from multiple sources and splits into chunks.
        sources: List of dicts with 'text' and 'metadata' (e.g., source_type, filename).
        """
        chunks = []
        
        for source in sources:
            text = clean_text(source.get("text", ""))
            metadata = source.get("metadata", {})
            
            if not text:
                continue

            # Split text into chunks
            text_chunks = self.text_splitter.split_text(text)
            
            for chunk in text_chunks:
                chunks.append({
                    "text": chunk,
                    "metadata": metadata
                })
                
        return chunks
