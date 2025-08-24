class Board:
    def __init__(self):
        self.grid = self.create_board()

    def create_board(self):
        return [["" for _ in range(8)] for _ in range(8)]
