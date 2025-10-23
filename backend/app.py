from flask import Flask, render_template, send_from_directory
import os

# Define base paths relative to backend/
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
STATIC_DIR = os.path.join(BASE_DIR, '../static')
TEMPLATE_DIR = os.path.join(BASE_DIR, '../templates')
ASSETS_DIR = os.path.join(BASE_DIR, '../assets/pieces')

# Initialize Flask app
app = Flask(__name__, static_folder=STATIC_DIR, template_folder=TEMPLATE_DIR)

# Home route
@app.route('/')
def index():
    return render_template('index.html')

# Serve chess piece images
@app.route('/assets/pieces/<path:filename>')
def serve_pieces(filename):
    return send_from_directory(ASSETS_DIR, filename)

# Serve favicon
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(STATIC_DIR, 'favicon.ico')

# Optional health check for CI/CD or uptime monitoring
@app.route('/health')
def health_check():
    return {'status': 'ok'}

# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)

