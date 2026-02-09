from fastapi import APIRouter, HTTPException
from game.engine import game_manager

router = APIRouter()


@router.post("/create")
def create_game():
    """
    Create a new chess game and return its ID + starting FEN.
    """
    import uuid
    game_id = str(uuid.uuid4())[:8]  # short clean ID
    board = game_manager.create_game(game_id)

    return {
        "game_id": game_id,
        "fen": board.fen()
    }


@router.get("/game/{game_id}")
def get_game_state(game_id: str):
    """
    Return the current FEN for a game.
    """
    fen = game_manager.get_fen(game_id)
    if fen is None:
        raise HTTPException(status_code=404, detail="Game not found")

    return {"game_id": game_id, "fen": fen}


@router.post("/move/{game_id}")
def make_move(game_id: str, move: str):
    """
    Apply a UCI move to the game and return updated FEN.
    """
    result = game_manager.make_move(game_id, move)

    if result is None:
        raise HTTPException(status_code=404, detail="Game not found")

    if result == "invalid":
        raise HTTPException(status_code=400, detail="Invalid move format")

    if result == "illegal":
        raise HTTPException(status_code=400, detail="Illegal move")

    # Success → return updated FEN
    return {
        "game_id": game_id,
        "fen": result.fen()
    }
