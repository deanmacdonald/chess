import chess
from sqlalchemy.orm import Session
from db.database import Game

class GameManager:
    """
    Persistent multi-game manager using python-chess + SQLite.
    """

    def __init__(self, db: Session):
        self.db = db

    # ---------------------------------------------------------
    # Create a new game
    # ---------------------------------------------------------
    def create_game(self, game_id: str) -> chess.Board:
        board = chess.Board()

        db_game = Game(
            game_id=game_id,
            fen=board.fen(),
            turn="white" if board.turn else "black",
            last_move=None
        )

        self.db.add(db_game)
        self.db.commit()

        return board

    # ---------------------------------------------------------
    # Load a game from DB
    # ---------------------------------------------------------
    def get_game(self, game_id: str):
        db_game = self.db.query(Game).filter(Game.game_id == game_id).first()
        if not db_game:
            return None

        board = chess.Board(db_game.fen)
        return board

    # ---------------------------------------------------------
    # Save updated game state
    # ---------------------------------------------------------
    def save_game(self, game_id: str, board: chess.Board, last_move=None):
        db_game = self.db.query(Game).filter(Game.game_id == game_id).first()
        if not db_game:
            return False

        db_game.fen = board.fen()
        db_game.turn = "white" if board.turn else "black"
        db_game.last_move = last_move

        self.db.commit()
        return True

    # ---------------------------------------------------------
    # Make a move
    # ---------------------------------------------------------
    def make_move(self, game_id: str, move_uci: str):
        board = self.get_game(game_id)
        if board is None:
            return None

        try:
            move = chess.Move.from_uci(move_uci)
        except ValueError:
            return "invalid"

        if move not in board.legal_moves:
            return "illegal"

        board.push(move)
        self.save_game(game_id, board, last_move=move_uci)
        return "ok"

