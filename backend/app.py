from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import chess
import os
import time
import platform
import flask
import requests
from importlib.metadata import version, PackageNotFoundError

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# Global chess board
board = chess.Board()

# App start time for uptime tracking
app_start_time = time.time()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/move', methods=['POST'])
def move():
    data = request.get_json()
    move_san = data.get('move')
    if not move_san:
        return jsonify({'error': 'No move provided'}), 400

    try:
        move = board.parse_san(move_san)
    except ValueError:
        return jsonify({'error': 'Invalid move notation'}), 400

    if move not in board.legal_moves:
        return jsonify({'error': 'Illegal move'}), 400

    board.push(move)
    return jsonify({
        'fen': board.fen(),
        'is_game_over': board.is_game_over(),
        'turn': 'white' if board.turn == chess.WHITE else 'black',
        'status': 'ok'
    })

@app.route('/reset', methods=['POST'])
def reset():
    global board
    board = chess.Board()
    return jsonify({'fen': board.fen(), 'status': 'reset'})

@app.route('/state', methods=['GET'])
def state():
    return jsonify({
        'fen': board.fen(),
        'is_game_over': board.is_game_over(),
        'turn': 'white' if board.turn == chess.WHITE else 'black'
    })

@app.route('/version', methods=['GET'])
def version_info():
    packages = ['flask', 'python-chess', 'requests', 'flask-cors', 'flask-debugtoolbar']
    versions = {}
    for pkg in packages:
        try:
            versions[pkg] = version(pkg)
        except PackageNotFoundError:
            versions[pkg] = 'not installed'
    versions['python'] = platform.python_version()
    return jsonify(versions)

@app.route('/diagnose', methods=['GET'])
def diagnose():
    issues = []
    diagnostics = {}

    # Static asset check
    static_files = [
        'css/chessboard.min.css',
        'css/style.css',
        'js/chess.min.js',
        'js/chessboard.min.js',
        'favicon.ico'
    ]
    missing_files = []
    for file in static_files:
        path = os.path.join(app.static_folder, file)
        if not os.path.exists(path):
            missing_files.append(file)
    if missing_files:
        issues.append(f"Missing static files: {missing_files}")

    # Template check
    index_path = os.path.join(app.template_folder, 'index.html')
    if not os.path.exists(index_path):
        issues.append("Missing index.html template")

    # Board status
    diagnostics['board'] = {
        'fen': board.fen(),
        'is_game_over': board.is_game_over(),
        'turn': 'white' if board.turn == chess.WHITE else 'black'
    }

    # Version info
    diagnostics['versions'] = {
        'python': platform.python_version(),
        'flask': flask.__version__,
        'python-chess': chess.__version__
    }

    # Uptime
    uptime_seconds = int(time.time() - app_start_time)
    diagnostics['uptime'] = f"{uptime_seconds} seconds"

    # API ping tests
    base_url = request.host_url.rstrip('/')
    try:
        move_test = requests.post(f"{base_url}/move", json={"move": "e4"})
        diagnostics['/move'] = move_test.status_code
    except Exception as e:
        issues.append(f"/move failed: {str(e)}")

    try:
        reset_test = requests.post(f"{base_url}/reset")
        diagnostics['/reset'] = reset_test.status_code
    except Exception as e:
        issues.append(f"/reset failed: {str(e)}")

    try:
        state_test = requests.get(f"{base_url}/state")
        diagnostics['/state'] = state_test.status_code
    except Exception as e:
        issues.append(f"/state failed: {str(e)}")

    # Final report
    if issues:
        diagnostics['status'] = 'issues found'
        diagnostics['details'] = issues
        return jsonify(diagnostics), 500
    else:
        diagnostics['status'] = 'healthy'
        diagnostics['message'] = 'All checks passed'
        return jsonify(diagnostics), 200

if __name__ == '__main__':
    app.run(debug=True)

