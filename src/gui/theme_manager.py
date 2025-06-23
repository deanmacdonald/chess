import json
import os
from typing import Any, Dict, List, Optional, Tuple

def is_valid_move(start_pos: Tuple[int, int], end_pos: Tuple[int, int], board) -> bool:
    """
    Check if a move is valid based on chess rules.
    """
    piece = board.get_piece_at(start_pos)
    return piece.can_move_to(end_pos, board) if piece else False

def add_to_move_history(
    move: Tuple[Tuple[int, int], Tuple[int, int]],
    history: List[Tuple[Tuple[int, int], Tuple[int, int]]]
) -> List[Tuple[Tuple[int, int], Tuple[int, int]]]:
    """
    Append a move to the game history.
    """
    history.append(move)
    return history

def get_legal_moves(piece: Any, board: Any) -> List[Tuple[int, int]]:
    """
    Return a list of valid moves for a given piece.
    """
    return piece.get_valid_moves(board)

def save_game_state(
    board_state: Any,
    turn: str,
    filename: str = "game_state.json"
) -> None:
    """
    Save game state to a JSON file.
    """
    try:
        with open(filename, "w", encoding="utf-8") as file:
            json.dump({"board": board_state, "turn": turn}, file, indent=2)
        print(f"✅ Game state saved to '{filename}'.")
    except (IOError, TypeError) as e:
        print(f"❌ Failed to save game state: {e}")

def load_game_state(filename: str = "game_state.json") -> Optional[Dict[str, Any]]:
    """
    Load game state from a JSON file.
    """
    if not os.path.exists(filename):
        print("⚠️ No saved game found. Starting fresh.")
        return None

    try:
        with open(filename, "r", encoding="utf-8") as file:
            return json.load(file)
    except (IOError, json.JSONDecodeError) as e:
        print(f"⚠️ Failed to load game state: {e}")
        return None

def highlight_moves(piece: Any, board: Any) -> List[Tuple[int, int]]:
    """
    Generate a list of tiles to highlight for available moves.
    """
    return piece.get_valid_moves(board)
