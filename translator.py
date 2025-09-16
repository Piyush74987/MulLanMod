from deep_translator import GoogleTranslator
from langdetect import detect
import re

class MultiLanguageTranslator:
    def __init__(self):
        self.supported_languages = {
            'en': 'English',
            'es': 'Spanish',
            'de': 'German',
            'hi': 'Hindi'
        }

    def detect_language(self, text):
        """Detect the language of input text"""
        try:
            clean_text = re.sub(r'[^\w\s]', '', text)
            detected_lang = detect(clean_text)
            return detected_lang if detected_lang in self.supported_languages else 'en'
        except:
            return 'en'

    def translate_text(self, text, source_lang=None):
        """Translate text to all other supported languages"""
        if not text.strip():
            return {"error": "Please enter some text to translate"}
        
        try:
            if not source_lang:
                source_lang = self.detect_language(text)

            target_languages = [lang for lang in self.supported_languages if lang != source_lang]

            translations = {
                'source_language': self.supported_languages[source_lang],
                'source_text': text,
                'translations': {}
            }

            for target_lang in target_languages:
                try:
                    translation = GoogleTranslator(
                        source=source_lang, target=target_lang
                    ).translate(text)

                    translations['translations'][target_lang] = {
                        'language': self.supported_languages[target_lang],
                        'text': translation
                    }
                except Exception as e:
                    translations['translations'][target_lang] = {
                        'language': self.supported_languages[target_lang],
                        'text': f"Translation error: {str(e)}"
                    }

            return translations

        except Exception as e:
            return {"error": f"Translation failed: {str(e)}"}

    def get_supported_languages(self):
        return self.supported_languages
