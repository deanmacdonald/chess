import chess
import chess.engine

class ChessAI:
    def __init__(self, color, engine_path="C:/Program Files/Stockfish/stockfish.exe"):
        self.color = color
        self.engine_path = engine_path

    def choose_move(self, board):
        # Get the python-chess board from your custom Board class
        internal_board = board.get_chess_board()

        # Flip board if AI plays black (Stockfish assumes white to move)
        if self.color == "black" and internal_board.turn != chess.BLACK:
            return None

        try:
            with chess.engine.SimpleEngine.popen_uci(self.engine_path) as engine:
                result = engine.play(internal_board, chess.engine.Limit(time=0.5))
                move = result.move

                # Convert move to (from_square, to_square) as tuple of coordinates
                from_sq = (chess.square_file(move.from_square), chess.square_rank(move.from_square))
                to_sq = (chess.square_file(move.to_square), chess.square_rank(move.to_square))

                return (from_sq, to_sq)
        except Exception as e:
            print(f"AI Error: {e}")
            return None

