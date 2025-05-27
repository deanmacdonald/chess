class Piece:
    """Class representing a chess piece with movement validation."""

    def __init__(self, piece_type, color, position):
        self.piece_type = piece_type
        self.color = color
        self.position = position

    def move(self, new_position):
        """Move the piece to a new position."""
        self.position = new_position

    def get_valid_moves(self, board):
        """Return a list of valid moves based on chess rules."""
        # Placeholder logic—actual movement rules depend on piece type.
        possible_moves = board.get_possible_moves(self.position)
        return [pos for pos in possible_moves if self.is_legal_move(pos, board)]

    def is_legal_move(self, new_position, board):
        """Check if moving to new_position follows chess rules."""
        # Implement piece-specific rules here (pawn movement, knight jumps, etc.)
        return True  # Placeholder—add actual move logic.
