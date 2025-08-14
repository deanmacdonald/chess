from flask import Flask, render_template_string
import chess

app = Flask(__name__)

@app.route("/")
def index():
    board = chess.Board()
    board_html = f"<pre>{board}</pre>"
    return render_template_string("""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Chess Board</title>
            <style>
                body { font-family: monospace; background: #f0f0f0; padding: 20px; }
                pre { font-size: 20px; line-height: 1.4; }
            </style>
        </head>
        <body>
            <h1>Current Chess Board</h1>
            {{ board_html|safe }}
        </body>
        </html>
    """, board_html=board_html)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
