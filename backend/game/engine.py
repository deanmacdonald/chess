class ChessEngine:
    def __init__(self):
        self.board = self._initial_board()

    def _initial_board(self):
        return [
            ["r","n","b","q","k","b","n","r"],
            ["p","p","p","p","p","p","p","p"],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["P","P","P","P","P","P","P","P"],
            ["R","N","B","Q","K","B","N","R"]
        ]

    def get_board_state(self):
        return self.board

    def make_move(self, from_sq, to_sq):
        # TODO: add real validation
        fx, fy = int(from_sq[1]), ord(from_sq[0]) - 97
        tx, ty = int(to_sq[1]), ord(to_sq[0]) - 97

        piece = self.board[fx][fy]
        self.board[fx][fy] = ""
        self.board[tx][ty] = piece

        return "ok"

