import os
import whisper
from moviepy.editor import VideoFileClip
from app.processing.text_cleaner import clean_text
import tempfile

class VideoProcessor:
    def __init__(self, model_size="base"):
        # Load the Whisper model
        # Available models: tiny, base, small, medium, large
        self.model = whisper.load_model(model_size)

    def process_video(self, video_path: str) -> str:
        """
        Extracts audio from video and transcribes it using Whisper.
        """
        try:
            # Create a temporary file for the audio
            with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as temp_audio:
                audio_path = temp_audio.name

            # Extract audio
            video = VideoFileClip(video_path)
            video.audio.write_audiofile(audio_path, verbose=False, logger=None)
            video.close() # Close to release resources

            # Transcribe
            result = self.model.transcribe(audio_path)
            text = result["text"]

            # Clean up
            os.remove(audio_path)

            return clean_text(text)

        except Exception as e:
            print(f"Error processing video {video_path}: {e}")
            if os.path.exists(audio_path):
                os.remove(audio_path)
            return ""

    def process_audio(self, audio_path: str) -> str:
        """
        Transcribes audio file using Whisper.
        """
        try:
            result = self.model.transcribe(audio_path)
            return clean_text(result["text"])
        except Exception as e:
            print(f"Error processing audio {audio_path}: {e}")
            return ""
