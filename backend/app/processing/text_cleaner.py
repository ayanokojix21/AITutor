import re

def clean_text(text: str) -> str:
    """
    Cleans and normalizes text by removing excessive whitespace and artifacts.
    """
    if not text:
        return ""
    
    # Remove excessive whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Remove non-printable characters (optional, depending on needs)
    # text = ''.join(c for c in text if c.isprintable())
    
    return text

def normalize_text(text: str) -> str:
    """
    Normalizes text for processing (lowercase, etc if needed).
    """
    return clean_text(text)
