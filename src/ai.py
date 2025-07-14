import random

class ChessAI:
    def __init__(self, color):
        self.color = color

    def choose_move(self, board):
        pieces = [p for p in board.get_all_pieces() if p.color == self.color]
        legal_moves = []

        for piece in pieces:
            for move in piece.get_valid_moves(board):
                legal_moves.append((piece.position, move))

        if legal_moves:
            return random.choice(legal_moves)
        else:
            return None

