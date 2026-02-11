import sys
import os

# Add backend to path
sys.path.append(os.path.abspath("/home/vulture/codefiles/rift/backend"))

print("Verifying imports...")

try:
    from app.core.config import settings
    print("✅ app.core.config import successful")
except ImportError as e:
    print(f"❌ app.core.config import failed: {e}")

try:
    from app.main import app
    print("✅ app.main import successful")
except ImportError as e:
    print(f"❌ app.main import failed: {e}")

try:
    from app.services.google_auth import GoogleAuthService
    print("✅ app.services.google_auth import successful")
except ImportError as e:
    print(f"❌ app.services.google_auth import failed: {e}")

try:
    from app.services.classroom_service import ClassroomService
    print("✅ app.services.classroom_service import successful")
except ImportError as e:
    print(f"❌ app.services.classroom_service import failed: {e}")

try:
    from app.processing.text_cleaner import clean_text
    print("✅ app.processing.text_cleaner import successful")
except ImportError as e:
    print(f"❌ app.processing.text_cleaner import failed: {e}")

try:
    from app.processing.pdf_processor import PDFProcessor
    print("✅ app.processing.pdf_processor import successful")
except ImportError as e:
    print(f"❌ app.processing.pdf_processor import failed: {e}")

try:
    from app.processing.video_processor import VideoProcessor
    print("✅ app.processing.video_processor import successful")
except ImportError as e:
    print(f"❌ app.processing.video_processor import failed: {e}")

try:
    from app.processing.semantic_merger import SemanticMerger
    print("✅ app.processing.semantic_merger import successful")
except ImportError as e:
    print(f"❌ app.processing.semantic_merger import failed: {e}")

print("\nVerifying basic functionality...")
text = clean_text("  This is   a test.   ")
if text == "This is a test.":
    print("✅ Text cleaner working")
else:
    print(f"❌ Text cleaner failed: '{text}'")
