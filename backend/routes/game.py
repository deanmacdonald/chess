from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
import uuid

from db.database import get_db
from game.engine import GameManager

# ---------------------------------------------------------
# Router configuration
# ---------------------------------------------------------
router = APIRouter(
    prefix="/game",
    tags=["game"]
)

# ---------------------------------------------------------
# Response Models
# ---------------------------------------------------------
class NewGameResponse(BaseModel):
    game_id: str
    fen: str
    turn: str

class MoveRequest(BaseModel):
    game_id: str
    move: str  # UCI format, e.g. "e2e4"

class MoveResponse(BaseModel):
    game_id: str
    fen: str
    turn: str

class StateResponse(BaseModel):
    game_id: str
    fen: str
    turn: str

# ---------------------------------------------------------
# Modern API (persistent multi‑game)
# ---------------------------------------------------------

@router.post("/new", response_model=NewGameResponse)
async def start_new_game(db: Session = Depends(get_db)):
    """
    Create a new persistent game and return its initial state.
    """
    manager = GameManager(db)

    game_id = str(uuid.uuid4())
    board = manager.create_game(game_id)

    return NewGameResponse(
        game_id=game_id,
        fen=board.fen(),
        turn="white" if board.turn else "black"
    )


@router.get("/state/{game_id}", response_model=StateResponse)
async def get_state(game_id: str, db: Session = Depends(get_db)):
    """
    Get the current state of a specific game.
    """
    manager = GameManager(db)

    board = manager.get_game(game_id)
    if board is None:
        raise HTTPException(status_code=404, detail="Game not found")

    return StateResponse(
        game_id=game_id,
        fen=board.fen(),
        turn="white" if board.turn else "black"
    )


@router.post("/move", response_model=MoveResponse)
async def make_move(req: MoveRequest, db: Session = Depends(get_db)):
    """
    Make a move in a specific game using UCI notation.
    """
    manager = GameManager(db)

    result = manager.make_move(req.game_id, req.move)

    if result is None:
        raise HTTPException(status_code=404, detail="Game not found")

    if result == "invalid":
        raise HTTPException(status_code=400, detail="Invalid move format")

    if result == "illegal":
        raise HTTPException(status_code=400, detail="Illegal move")

    board = manager.get_game(req.game_id)

    return MoveResponse(
        game_id=req.game_id,
        fen=board.fen(),
        turn="white" if board.turn else "black"
    )

# ---------------------------------------------------------
# Legacy Compatibility API (for old frontend)
# ---------------------------------------------------------

@router.get("/legacy/game")
async def legacy_game(db: Session = Depends(get_db)):
    """
    Legacy endpoint: auto-create a single game for the old frontend.
    """
    manager = GameManager(db)

    game_id = str(uuid.uuid4())
    board = manager.create_game(game_id)

    return {
        "game_id": game_id,
        "fen": board.fen(),
        "turn": "white" if board.turn else "black"
    }


@router.get("/legacy/state")
async def legacy_state(db: Session = Depends(get_db)):
    """
    Legacy endpoint: return the most recently created game.
    """
    manager = GameManager(db)

    # Query all games and pick the first one
    db_game = db.query(GameManager.db_model).first()
    if not db_game:
        raise HTTPException(status_code=404, detail="No game exists")

    board = manager.get_game(db_game.game_id)

    return {
        "game_id": db_game.game_id,
        "fen": board.fen(),
        "turn": "white" if board.turn else "black"
    }

