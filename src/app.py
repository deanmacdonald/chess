from flask import Flask, render_template, jsonify, request
from game import Game  # Assuming Game is a class in game.py that handles logic

app = Flask(__name__, static_folder="public", template_folder="templates")

# Initialize game instance
game = Game()

@app.route('/')
def home():
    return render_template("index.html")  # Main page

@app.route('/play', methods=['POST'])
def play():
    """Handles a game move."""
    data = request.json  # Get move data from request
    move = data.get("move")

    if move:
        response = game.make_move(move)  # Call game function to make a move
        return jsonify({"status": "success", "board": response})
    
    return jsonify({"status": "error", "message": "Invalid move"}), 400

@app.route('/state')
def get_state():
    """Returns the current state of the game."""
    state = game.get_board()  # Fetch board state
    return jsonify({"board": state})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)  # Enables debugging
