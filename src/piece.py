class Piece:
    def __init__(self, color, type_, position):
        self.color = color              # "white" or "black"
        self.type = type_              # "pawn", "rook", etc.
        self.position = position       # (row, col)
        self.has_moved = False         # Track move history for special rules

    def get_image_key(self):
        return f"{self.color}_{self.type}"

    def get_valid_moves(self, board):
        moves = []
        row, col = self.position

        if self.type == "pawn":
            dir = -1 if self.color == "white" else 1
            start_row = 6 if self.color == "white" else 1

            # Single step forward
            one_step = (row + dir, col)
            if board.is_empty(one_step):
                moves.append(one_step)

                # Double step on first move
                two_step = (row + 2 * dir, col)
                if row == start_row and board.is_empty(two_step):
                    moves.append(two_step)

            # Diagonal capture
            for dc in [-1, 1]:
                diag = (row + dir, col + dc)
                if board.is_enemy(diag, self.color):
                    moves.append(diag)

                # En passant capture
                if diag == board.game.en_passant_target:
                    moves.append(diag)

        elif self.type == "knight":
            steps = [(2, 1), (1, 2), (-1, 2), (-2, 1),
                     (-2, -1), (-1, -2), (1, -2), (2, -1)]
            for dr, dc in steps:
                target = (row + dr, col + dc)
                if board.is_within_bounds(target) and not board.is_friendly(target, self.color):
                    moves.append(target)

        elif self.type in ["rook", "bishop", "queen"]:
            directions = []
            if self.type in ["rook", "queen"]:
                directions += [(1, 0), (-1, 0), (0, 1), (0, -1)]
            if self.type in ["bishop", "queen"]:
                directions += [(1, 1), (-1, -1), (1, -1), (-1, 1)]

            for dr, dc in directions:
                for i in range(1, 8):
                    r, c = row + dr * i, col + dc * i
                    if not board.is_within_bounds((r, c)):
                        break
                    if board.is_empty((r, c)):
                        moves.append((r, c))
                    elif board.is_enemy((r, c), self.color):
                        moves.append((r, c))
                        break
                    else:
                        break

        elif self.type == "king":
            steps = [(1, 0), (-1, 0), (0, 1), (0, -1),
                     (1, 1), (-1, -1), (1, -1), (-1, 1)]
            for dr, dc in steps:
                r, c = row + dr, col + dc
                target = (r, c)
                if board.is_within_bounds(target) and not board.is_friendly(target, self.color):
                    moves.append(target)

            # Castling (basic version — validation handled elsewhere)
            if not self.has_moved:
                r = row
                for side in ["king", "queen"]:
                    if board.can_castle(self.color, side):
                        c = col + 2 if side == "king" else col - 2
                        moves.append((r, c))

        return moves

