# logic.py
from pieces import board

def is_valid_move(start_pos, end_pos, piece, board_state):
    """
    Basic move validation: checks if the move is within bounds and not capturing own piece.
    You can expand this with piece-specific rules later.
    """
    sr, sc = start_pos
    er, ec = end_pos

    if not (0 <= sr < 8 and 0 <= sc < 8 and 0 <= er < 8 and 0 <= ec < 8):
        return False  # Out of bounds

    target_piece = board_state[er][ec]
    if target_piece != "--" and target_piece[0] == piece[0]:
        return False  # Can't capture own piece

    # TODO: Add piece-specific movement rules here
    return True

def make_move(start_pos, end_pos, board_state):
    """
    Executes a move if valid. Returns updated board.
    """
    sr, sc = start_pos
    er, ec = end_pos
    piece = board_state[sr][sc]

    if is_valid_move(start_pos, end_pos, piece, board_state):
        board_state[er][ec] = piece
        board_state[sr][sc] = "--"
        return True
    return False

def get_piece_moves(pos, board_state):
    """
    Placeholder for generating legal moves for a piece.
    You can implement logic for each piece type here.
    """
    row, col = pos
    piece = board_state[row][col]
    moves = []

    # Example: pawns move forward
    if piece[1] == "P":
        direction = -1 if piece[0] == "w" else 1
        next_row = row + direction
        if 0 <= next_row < 8 and board_state[next_row][col] == "--":
            moves.append((next_row, col))

    # TODO: Add logic for other pieces
    return moves

