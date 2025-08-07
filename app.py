from flask import Flask
import chess

app = Flask(__name__)

@app.route("/")
def index():
    board = chess.Board()
    return f"<pre>{board}</pre>"

if __name__ == "__main__":
    app.run(debug=True)
