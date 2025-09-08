from game.pieces import Pawn, Knight, Bishop, Rook, Queen, King

class Board:
    def __init__(self):
        self.grid = [[None for _ in range(8)] for _ in range(8)]
        self.setup_initial_position()

    def setup_initial_position(self):
        # Black pieces
        self.grid[0] = [
            Rook("black", (0, 0)), Knight("black", (0, 1)), Bishop("black", (0, 2)), Queen("black", (0, 3)),
            King("black", (0, 4)), Bishop("black", (0, 5)), Knight("black", (0, 6)), Rook("black", (0, 7))
        ]
        self.grid[1] = [Pawn("black", (1, col)) for col in range(8)]

        # White pieces
        self.grid[6] = [Pawn("white", (6, col)) for col in range(8)]
        self.grid[7] = [
            Rook("white", (7, 0)), Knight("white", (7, 1)), Bishop("white", (7, 2)), Queen("white", (7, 3)),
            King("white", (7, 4)), Bishop("white", (7, 5)), Knight("white", (7, 6)), Rook("white", (7, 7))
        ]

    def __getitem__(self, index):
        return self.grid[index]

    def get_piece(self, row, col):
        if 0 <= row < 8 and 0 <= col < 8:
            return self.grid[row][col]
        return None

    def set_piece(self, row, col, piece):
        if 0 <= row < 8 and 0 <= col < 8:
            self.grid[row][col] = piece

    def move_piece(self, start_pos, end_pos):
        start_row, start_col = start_pos
        end_row, end_col = end_pos
        piece = self.get_piece(start_row, start_col)
        if piece:
            piece.position = (end_row, end_col)
        self.set_piece(end_row, end_col, piece)
        self.set_piece(start_row, start_col, None)

    def __str__(self):
        rows = []
        for row in self.grid:
            rows.append(' '.join([p.symbol() if p else '.' for p in row]))
        return '\n'.join(rows)

    def get_piece_image_path(self, row, col):
        piece = self.get_piece(row, col)
        return piece.get_image_path() if piece else None

