from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import chess

router = APIRouter(prefix="/api", tags=["game"])

# In‑memory board instance
board = chess.Board()

class Move(BaseModel):
    from_square: str
    to_square: str


@router.get("/game")
def get_game():
    """Return the current board state in FEN."""
    return {
        "game_id": "default",
        "state": {
            "board": board.fen(),
            "message": "Game loaded"
        }
    }


@router.post("/move")
def make_move(move: Move):
    """Apply a move and return updated board state."""
    try:
        uci = move.from_square + move.to_square
        uci_move = chess.Move.from_uci(uci)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid move format")

    if uci_move not in board.legal_moves:
        raise HTTPException(status_code=400, detail="Illegal move")

    board.push(uci_move)

    return {
        "status": "ok",
        "move": {
            "from": move.from_square,
            "to": move.to_square
        },
        "state": {
            "board": board.fen(),
            "message": f"Move {move.from_square}->{move.to_square} applied"
        }
    }
