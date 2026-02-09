from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import chess

router = APIRouter(tags=["game"])

board = chess.Board()

class Move(BaseModel):
    move: str | None = None
    from_square: str | None = None
    to_square: str | None = None


@router.get("/game")
def get_game():
    return {
        "fen": board.fen(),
        "moves": [],
        "turn": "white" if board.turn else "black",
        "white": "White Player",
        "black": "Black Player",
        "time_control": 300
    }


@router.post("/new")
def new_game():
    global board
    board = chess.Board()
    return {
        "game_id": "default",
        "state": {
            "board": board.fen(),
            "message": "New game started"
        }
    }


@router.get("/state/{game_id}")
def get_state(game_id: str):
    return {
        "game_id": game_id,
        "state": {
            "board": board.fen(),
            "message": "Game state loaded"
        }
    }


@router.post("/move")
def make_move(move: Move):
    try:
        if move.move:
            uci_move = chess.Move.from_uci(move.move)
        else:
            uci_move = chess.Move.from_uci(move.from_square + move.to_square)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid move format")

    if uci_move not in board.legal_moves:
        raise HTTPException(status_code=400, detail="Illegal move")

    board.push(uci_move)

    return {
        "status": "ok",
        "state": {
            "board": board.fen(),
            "message": "Move applied"
        }
    }
