
<body>
    <h1>🌐 Multi-Language Translator</h1>

   <p>A Flask-based web application that automatically detects and translates text between English, Spanish, German, and Hindi.</p>

  <p>🌐 Live Demo: <a href="https://multi-language-translator-qg40.onrender.com/" target="_blank">https://multi-language-translator-qg40.onrender.com/</a></p>

  <h2>Features</h2>
    <ul>
        <li><strong>Automatic Language Detection:</strong> Detects input language automatically</li>
        <li><strong>Multi-language Translation:</strong> Translates to all other supported languages</li>
        <li><strong>Real-time Feedback:</strong> Shows detected language as you type</li>
        <li><strong>Responsive Design:</strong> Works on desktop and mobile devices</li>
        <li><strong>Speaker:</strong> Listen to the pronunciation of each translation</li>
        <li><strong>Clean Interface:</strong> Modern, user-friendly design</li>
    </ul>

   <h2>Installation</h2>
    <ol>
        <li>Clone or download the project repository.</li>
        <li>Install dependencies:
            <pre><code>pip install -r requirements.txt</code></pre>
        </li>
        <li>Run the application:
            <pre><code>python app.py</code></pre>
        </li>
        <li>Open your browser and go to <a href="http://localhost:5000">http://localhost:5000</a></li>
    </ol>

   <h2>Usage</h2>
    <ol>
        <li>Type or paste text in the input area.</li>
        <li>Click <strong>Translate</strong> to see translations in all other supported languages.</li>
        <li>Click the <strong>Speaker 🔊</strong> button next to each translation to hear its pronunciation.</li>
        <li>Click <strong>Clear</strong> to reset everything.</li>
    </ol>

  <h2>Supported Languages</h2>
   <ul>
        <li>English (en)</li>
        <li>Spanish (es)</li>
        <li>German (de)</li>
        <li>Hindi (hi)</li>
    </ul>

   <table border="1" width="500" cellspacing="0" cellpadding="8">
  <tr>
    <th>Plain Form</th>
    <th>Input Form</th>
    <th>Prediction Result</th>
  </tr>
  <tr>
    <td>
      <img 
        width="1774" height="844" alt="Screenshot (68)" src="https://github.com/user-attachments/assets/f0ce6b9d-5741-4ca9-b53a-29e3b0a3d12a"
        alt="Input Form"
        width="240"
      />![Uploading Screenshot (68).png…]()

</td>
    <td>
      <img 
        width="1920" height="1080" alt="Screenshot (42)" src="https://github.com/user-attachments/assets/2add93ac-7837-4562-bec7-9050c2534195"
        alt="Prediction Result"
        width="240"
      />![Uploading Screenshot (69).png…]()

 </td>
    <td>
      <img 
        width="1920" height="1080" alt="Screenshot (42)" src="https://github.com/user-attachments/assets/2add93ac-7837-4562-bec7-9050c2534195"
        alt="Prediction Result"
        width="240"
      />![Uploading Screenshot (70).png…]()

    </td>
  </tr>
</table>
 
    

  <h2>Project Structure</h2>
    <pre><code>
language_translator/
├── app.py                 # Main Flask application
├── translator.py          # Translation logic
├── requirements.txt       # Project dependencies
├── templates/
│   └── index.html         # Frontend HTML template
├── static/
│   ├── style.css          # CSS styling
│   └── script.js          # JavaScript functionality
└── README.html            # This documentation
    </code></pre>

  <h2>Technical Details</h2>
    <ul>
        <li><strong>Backend:</strong> Flask (Python)</li>
        <li><strong>Translation:</strong> Google Translate API (googletrans)</li>
        <li><strong>Language Detection:</strong> langdetect library</li>
        <li><strong>Frontend:</strong> HTML & JavaScript</li>
        <li><strong>Speaker:</strong> Browser speech synthesis API</li>
    </ul>

   <h2>API Endpoints</h2>
    <ul>
        <li><code>GET /</code>: Main application page</li>
        <li><code>POST /translate</code>: Translate text to all supported languages</li>
    </ul>

  <h2>Requirements</h2>
    <ul>
        <li>Python 3.7+</li>
        <li>Internet connection (for Google Translate API)</li>
    </ul>


  <h2>License</h2>
    <p>MIT License</p>
    

</body>
</html>
