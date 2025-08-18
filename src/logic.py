# logic.py

def is_valid_move(start_pos, end_pos, piece, board_state):
    """
    Basic move validator:
    - Ensures positions are in bounds
    - Prevents capturing own piece
    Future logic could include actual piece movement rules.
    """
    sr, sc = start_pos
    er, ec = end_pos

    if not (0 <= sr < 8 and 0 <= sc < 8 and 0 <= er < 8 and 0 <= ec < 8):
        return False  # Out of bounds

    target = board_state[er][ec]
    if target != "--" and target[0] == piece[0]:
        return False  # Can't capture own color

    # TODO: Piece-specific movement rules can be added here
    return True

def make_move(start_pos, end_pos, board_state):
    """
    Attempts a move on the board. If valid, updates board_state in place.
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
    Generates placeholder legal moves for a piece at a given position.
    Currently supports pawn forward movement only.
    Expandable to full ruleset.
    """
    row, col = pos
    piece = board_state[row][col]
    if piece == "--":
        return []

    moves = []

    # Basic pawn logic — move forward one if space is empty
    if piece[1] == "P":
        direction = -1 if piece[0] == "w" else 1
        next_row = row + direction
        if 0 <= next_row < 8 and board_state[next_row][col] == "--":
            moves.append((next_row, col))

    # TODO: Add logic for other pieces (rook, knight, etc.)
    return moves

