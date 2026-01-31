from fastapi import FastAPI
from game.engine import ChessEngine

app = FastAPI()
engine = ChessEngine()

@app.get("/status")
def status():
    return {"service": "chess-backend", "status": "ok"}

@app.get("/board")
def get_board():
    return engine.get_board_state()

@app.post("/move")
def make_move(from_square: str, to_square: str):
    result = engine.make_move(from_square, to_square)
    return {"result": result, "board": engine.get_board_state()}

