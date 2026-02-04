from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import chess

router = APIRouter(tags=["game"])

# Single in‑memory board instance
board = chess.Board()

class Move(BaseModel):
    game_id: str | None = None
    move: str | None = None
    from_square: str | None = None
    to_square: str | None = None


# ---------------------------------------------------------
# NEW: Main endpoint the frontend expects: /api/game
# ---------------------------------------------------------
@router.get("/game")
def get_game():
    """Return initial game state in the format the frontend expects."""
    return {
        "fen": board.fen(),
        "moves": [],
        "turn": "white" if board.turn else "black",
        "white": "White Player",
        "black": "Black Player",
        "time_control": 300
    }


# ---------------------------------------------------------
# Reset game
# ---------------------------------------------------------
@router.post("/new")
def new_game():
    """Reset the board and return initial state."""
    global board
    board = chess.Board()
    return {
        "game_id": "default",
        "state": {
            "board": board.fen(),
            "message": "New game started"
        }
    }


# ---------------------------------------------------------
# Get current state
# ---------------------------------------------------------
@router.get("/state/{game_id}")
def get_state(game_id: str):
    """Return current board state."""
    return {
        "game_id": game_id,
        "state": {
            "board": board.fen(),
            "message": "Game state loaded"
        }
    }


# ---------------------------------------------------------
# Make a move
# ---------------------------------------------------------
@router.post("/move")
def make_move(move: Move):
    """Apply a move and return updated board state."""
    try:
        # Support both formats: uci string OR from/to squares
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
