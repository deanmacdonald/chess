import chess
from typing import Dict, Optional


class GameManager:
    def __init__(self):
        # Store multiple games by ID
        self.games: Dict[str, chess.Board] = {}

    def create_game(self, game_id: str) -> chess.Board:
        """Create a new game with a fresh board."""
        board = chess.Board()
        self.games[game_id] = board
        return board

    def get_game(self, game_id: str) -> Optional[chess.Board]:
        """Retrieve an existing game by ID."""
        return self.games.get(game_id)

    def get_initial_fen(self) -> str:
        """Return the starting FEN for a new game."""
        return chess.Board().fen()

    def make_move(self, game_id: str, move_uci: str):
        """
        Apply a UCI move to the board.
        Returns:
            - updated board (success)
            - "invalid" if UCI is malformed
            - "illegal" if move is not legal
            - None if game doesn't exist
        """
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

    def get_fen(self, game_id: str) -> Optional[str]:
        """Return the current FEN for a game."""
        board = self.get_game(game_id)
        return board.fen() if board else None


# Global instance used by router
game_manager = GameManager()
