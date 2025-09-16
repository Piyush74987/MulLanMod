from flask import Flask, render_template, request, jsonify, send_file
from translator import MultiLanguageTranslator
from gtts import gTTS
import io

app = Flask(__name__)
translator = MultiLanguageTranslator()

@app.route('/')
def index():
    return render_template('index.html', languages=translator.get_supported_languages())

@app.route('/translate', methods=['POST'])
def translate():
    try:
        data = request.get_json()
        text = data.get('text', '').strip()
        source_lang = data.get('source_lang')

        if not text:
            return jsonify({"error": "Please enter text to translate"})

        result = translator.translate_text(text, source_lang)
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"})

# TTS endpoint
@app.route('/speak', methods=['POST'])
def speak_text():
    try:
        data = request.get_json()
        text = data.get('text', '').strip()
        lang = data.get('lang', 'en')

        if not text:
            return jsonify({"error": "No text provided for speech"})

        tts = gTTS(text=text, lang=lang)
        audio_fp = io.BytesIO()
        tts.write_to_fp(audio_fp)
        audio_fp.seek(0)

        return send_file(audio_fp, mimetype="audio/mpeg")

    except Exception as e:
        return jsonify({"error": f"Speech failed: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
