let translatorApp;

class TranslatorApp {
    constructor() {
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.inputText = document.getElementById('inputText');
        this.translateBtn = document.getElementById('translateBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.resultsSection = document.getElementById('resultsSection');
        this.translationResults = document.getElementById('translationResults');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.errorMessage = document.getElementById('errorMessage');
        this.detectedLang = document.getElementById('detectedLang');
    }

    bindEvents() {
        this.translateBtn.addEventListener('click', () => this.translateText());
        this.clearBtn.addEventListener('click', () => this.clearAll());

        // Debounced auto-detect
        let timeout;
        this.inputText.addEventListener('input', () => {
            clearTimeout(timeout);
            if (this.inputText.value.trim()) {
                timeout = setTimeout(() => this.detectLanguage(), 500);
            }
        });

        // Ctrl+Enter to translate
        this.inputText.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.translateText();
            }
        });
    }

    showLoading() { this.loadingSpinner.style.display = 'flex'; }
    hideLoading() { this.loadingSpinner.style.display = 'none'; }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
        setTimeout(() => { this.errorMessage.style.display = 'none'; }, 5000);
    }

    async translateText() {
        const text = this.inputText.value.trim();
        if (!text) {
            this.showError('Please enter some text to translate');
            return;
        }

        this.showLoading();
        try {
            const response = await fetch('/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: text })
            });

            const data = await response.json();
            if (data.error) { this.showError(data.error); return; }
            this.displayTranslations(data);

        } catch {
            this.showError('Network error. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    async detectLanguage() {
        const text = this.inputText.value.trim();
        if (!text) return;

        try {
            const response = await fetch('/detect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: text })
            });

            const data = await response.json();
            this.detectedLang.textContent = data.error ? 'Detection failed'
                : `Detected: ${data.language_name}`;
        } catch {
            this.detectedLang.textContent = 'Detection failed';
        }
    }

    displayTranslations(data) {
        const languageFlags = { en: '🇺🇸', es: '🇪🇸', de: '🇩🇪', hi: '🇮🇳' };

        let html = `
            <div class="translation-item">
                <div class="translation-header">
                    <span class="language-flag">${languageFlags[this.getLanguageCode(data.source_language)]}</span>
                    <span class="language-name">Original (${data.source_language})</span>
                    <button class="speak-btn" onclick="translatorApp.playSpeech('${data.source_text}', '${this.getLanguageCode(data.source_language)}')">🔊</button>
                </div>
                <div class="translation-text">${data.source_text}</div>
            </div>
        `;

        for (const [langCode, translation] of Object.entries(data.translations)) {
            html += `
                <div class="translation-item">
                    <div class="translation-header">
                        <span class="language-flag">${languageFlags[langCode]}</span>
                        <span class="language-name">${translation.language}</span>
                        <button class="speak-btn" onclick="translatorApp.playSpeech('${translation.text}', '${langCode}')">🔊</button>
                    </div>
                    <div class="translation-text">${translation.text}</div>
                </div>
            `;
        }

        this.translationResults.innerHTML = html;
        this.resultsSection.style.display = 'block';
    }

    getLanguageCode(languageName) {
        const map = { English: 'en', Spanish: 'es', German: 'de', Hindi: 'hi' };
        return map[languageName] || 'en';
    }

    async playSpeech(text, lang) {
        try {
            const response = await fetch('/speak', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: text, lang: lang })
            });

            if (!response.ok) return;

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();

        } catch {
            this.showError("Unable to play speech");
        }
    }

    clearAll() {
        this.inputText.value = '';
        this.translationResults.innerHTML = '';
        this.detectedLang.textContent = 'Language will be auto-detected';
        this.resultsSection.style.display = 'none';
        this.errorMessage.style.display = 'none';
        this.inputText.focus();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    translatorApp = new TranslatorApp();
});
