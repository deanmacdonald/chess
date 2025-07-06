class Piece:
    """Represents a chess piece and its basic movement behavior."""

    MOVE_RULES = {
        "pawn": lambda self, board: self._pawn_moves(board),
        "rook": lambda self, board: self._linear_moves(board, directions=[(1,0), (-1,0), (0,1), (0,-1)]),
        "bishop": lambda self, board: self._linear_moves(board, directions=[(1,1), (1,-1), (-1,1), (-1,-1)]),
        "queen": lambda self, board: self._linear_moves(board, directions=[(1,0), (-1,0), (0,1), (0,-1), (1,1), (1,-1), (-1,1), (-1,-1)]),
        "king": lambda self, board: self._king_moves(board),
        "knight": lambda self, board: self._knight_moves(board),
    }

    def __init__(self, piece_type, color, position):
        self.piece_type = piece_type
        self.color = color
        self.position = position

    def move(self, new_position):
        self.position = new_position

    def get_valid_moves(self, board):
        move_func = self.MOVE_RULES.get(self.piece_type)
        if move_func:
            return move_func(self, board)
        return []

    def is_legal_move(self, new_position, board):
        return new_position in self.get_valid_moves(board)

    # --- Movement Implementations ---

    def _pawn_moves(self, board):
        direction = -1 if self.color == "white" else 1
        file = ord(self.position[0]) - ord("a")
        rank = int(self.position[1])
        moves = []

        # Forward move
        one_step = f"{chr(ord('a') + file)}{rank + direction}"
        if board.is_empty(one_step):
            moves.append(one_step)

        return moves

    def _linear_moves(self, board, directions):
        moves = []
        file = ord(self.position[0]) - ord("a")
        rank = int(self.position[1])
        for dx, dy in directions:
            x, y = file, rank
            while True:
                x += dx
                y += dy
                if x < 0 or x > 7 or y < 1 or y > 8:
                    break
                new_pos = f"{chr(ord('a') + x)}{y}"
                if board.is_empty(new_pos):
                    moves.append(new_pos)
                else:
                    if board.get_piece(new_pos).color != self.color:
                        moves.append(new_pos)  # Capture
                    break
        return moves

    def _king_moves(self, board):
        # One square in any direction
        directions = [(1,0), (-1,0), (0,1), (0,-1), (1,1), (1,-1), (-1,1), (-1,-1)]
        return self._limited_moves(board, directions, max_steps=1)

    def _knight_moves(self, board):
        file = ord(self.position[0]) - ord("a")
        rank = int(self.position[1])
        offsets = [(2,1), (1,2), (-1,2), (-2,1), (-2,-1), (-1,-2), (1,-2), (2,-1)]
        moves = []
        for dx, dy in offsets:
            x = file + dx
            y = rank + dy
            if 0 <= x <= 7 and 1 <= y <= 8:
                pos = f"{chr(ord('a') + x)}{y}"
                if board.is_empty(pos) or board.get_piece(pos).color != self.color:
                    moves.append(pos)
        return moves

    def _limited_moves(self, board, directions, max_steps=1):
        moves = []
        file = ord(self.position[0]) - ord("a")
        rank = int(self.position[1])
        for dx, dy in directions:
            x = file + dx
            y = rank + dy
            if 0 <= x <= 7 and 1 <= y <= 8:
                pos = f"{chr(ord('a') + x)}{y}"
                if board.is_empty(pos) or board.get_piece(pos).color != self.color:
                    moves.append(pos)
        return moves

