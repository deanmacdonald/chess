class Piece:
    """Base class for a chess piece with movement validation."""

    def __init__(self, piece_type, color, position):
        self.piece_type = piece_type.lower()  # e.g., 'pawn', 'knight'
        self.color = color.lower()            # 'white' or 'black'
        self.position = position              # (row, col)

    def move(self, new_position):
        """Update the piece's position."""
        self.position = new_position

    def get_valid_moves(self, board):
        """Return a list of valid moves based on piece type and board state."""
        if self.piece_type == 'pawn':
            return self._pawn_moves(board)
        elif self.piece_type == 'knight':
            return self._knight_moves(board)
        # Add more piece types here...
        return []

    def _pawn_moves(self, board):
        """Generate valid pawn moves."""
        direction = -1 if self.color == 'white' else 1
        row, col = self.position
        moves = []

        # Forward move
        if board.is_empty((row + direction, col)):
            moves.append((row + direction, col))

            # Double move from starting position
            start_row = 6 if self.color == 'white' else 1
            if row == start_row and board.is_empty((row + 2 * direction, col)):
                moves.append((row + 2 * direction, col))

        # Captures
        for dc in [-1, 1]:
            target = (row + direction, col + dc)
            if board.is_enemy(target, self.color):
                moves.append(target)

        return moves

    def _knight_moves(self, board):
        """Generate valid knight moves."""
        row, col = self.position
        offsets = [
            (-2, -1), (-2, 1), (-1, -2), (-1, 2),
            (1, -2),  (1, 2),  (2, -1),  (2, 1)
        ]
        moves = []
        for dr, dc in offsets:
            target = (row + dr, col + dc)
            if board.is_within_bounds(target) and not board.is_friendly(target, self.color):
                moves.append(target)
        return moves

    def __repr__(self):
        return f"{self.color.capitalize()} {self.piece_type.capitalize()} at {self.position}"
