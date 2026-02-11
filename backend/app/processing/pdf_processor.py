import io
from pypdf import PdfReader
from app.processing.text_cleaner import clean_text

class PDFProcessor:
    def process(self, file_content: bytes) -> str:
        """
        Extracts text from a PDF file (bytes).
        """
        try:
            reader = PdfReader(io.BytesIO(file_content))
            text = ""
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
            
            return clean_text(text)
        except Exception as e:
            print(f"Error processing PDF: {e}")
            return ""

    def process_file(self, file_path: str) -> str:
        """
        Extracts text from a PDF file path.
        """
        try:
            reader = PdfReader(file_path)
            text = ""
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
            
            return clean_text(text)
        except Exception as e:
            print(f"Error processing PDF file {file_path}: {e}")
            return ""
