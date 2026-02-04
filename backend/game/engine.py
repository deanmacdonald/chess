import chess
from typing import Dict

class GameManager:
    def __init__(self):
        self.games: Dict[str, chess.Board] = {}

    def create_game(self, game_id: str):
        board = chess.Board()
        self.games[game_id] = board
        return board

    def get_game(self, game_id: str):
        return self.games.get(game_id)

    def make_move(self, game_id: str, move_uci: str):
        board = self.get_game(game_id)
        if board is None:
            return None

        try:
            move = chess.Move.from_uci(move_uci)
        except:
            return "invalid"

        if move not in board.legal_moves:
            return "illegal"

        board.push(move)
        return board

