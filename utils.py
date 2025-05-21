import json
import os

def is_valid_move(start_pos, end_pos, board):
    """Check if a move is valid based on chess rules."""
    piece = board.get_piece_at(start_pos)
    return piece.can_move_to(end_pos, board) if piece else False

def add_to_move_history(move, history):
    """Append a move to the game history."""
    history.append(move)
    return history

def get_legal_moves(piece, board):
    """Return a list of valid moves for a given piece."""
    return [pos for pos in board if piece.can_move_to(pos, board)]

def save_game_state(board_state, turn, filename="game_state.json"):
    """Save game state to a JSON file."""
    data = {"board": board_state, "turn": turn}
    with open(filename, "w") as file:
        json.dump(data, file)
    print("✅ Game state saved.")

def load_game_state(filename="game_state.json"):
    """Load game state from a JSON file."""
    if os.path.exists(filename):
        with open(filename, "r") as file:
            return json.load(file)
    print("⚠️ No saved game found. Starting fresh.")
    return None

def highlight_moves(piece, board):
    """Generate a list of tiles to highlight for available moves."""
    return [pos for pos in board if piece.can_move_to(pos, board)]
