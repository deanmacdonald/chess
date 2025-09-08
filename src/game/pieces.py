from .piece import Piece

class Pawn(Piece):
    def get_legal_moves(self, board, position):
        row, col = position
        direction = -1 if self.color == "white" else 1
        moves = []

        # Forward move
        if board.get_piece(row + direction, col) is None:
            moves.append((row + direction, col))

            # First move double step
            start_row = 6 if self.color == "white" else 1
            if row == start_row and board.get_piece(row + 2 * direction, col) is None:
                moves.append((row + 2 * direction, col))

        # Diagonal captures
        for dc in [-1, 1]:
            target = board.get_piece(row + direction, col + dc)
            if target and target.color != self.color:
                moves.append((row + direction, col + dc))

        return moves


class Knight(Piece):
    def get_legal_moves(self, board, position):
        row, col = position
        moves = []
        offsets = [
            (-2, -1), (-2, 1), (-1, -2), (-1, 2),
            (1, -2), (1, 2), (2, -1), (2, 1)
        ]
        for dr, dc in offsets:
            r, c = row + dr, col + dc
            target = board.get_piece(r, c)
            if 0 <= r < 8 and 0 <= c < 8 and (not target or target.color != self.color):
                moves.append((r, c))
        return moves


class Bishop(Piece):
    def get_legal_moves(self, board, position):
        return self._slide_moves(board, position, [(-1, -1), (-1, 1), (1, -1), (1, 1)])


class Rook(Piece):
    def get_legal_moves(self, board, position):
        return self._slide_moves(board, position, [(-1, 0), (1, 0), (0, -1), (0, 1)])


class Queen(Piece):
    def get_legal_moves(self, board, position):
        return self._slide_moves(board, position, [
            (-1, -1), (-1, 1), (1, -1), (1, 1),
            (-1, 0), (1, 0), (0, -1), (0, 1)
        ])


class King(Piece):
    def get_legal_moves(self, board, position):
        row, col = position
        moves = []
        for dr in [-1, 0, 1]:
            for dc in [-1, 0, 1]:
                if dr == 0 and dc == 0:
                    continue
                r, c = row + dr, col + dc
                if 0 <= r < 8 and 0 <= c < 8:
                    target = board.get_piece(r, c)
                    if not target or target.color != self.color:
                        moves.append((r, c))
        return moves

# Shared sliding logic for Bishop, Rook, Queen
def _slide_moves(self, board, position, directions):
    row, col = position
    moves = []
    for dr, dc in directions:
        r, c = row + dr, col + dc
        while 0 <= r < 8 and 0 <= c < 8:
            target = board.get_piece(r, c)
            if not target:
                moves.append((r, c))
            elif target.color != self.color:
                moves.append((r, c))
                break
            else:
                break
            r += dr
            c += dc
    return moves

# Attach shared method to Piece class
Piece._slide_moves = _slide_moves

