import chess.engine

def get_best_move(board_fen):
    with chess.engine.SimpleEngine.popen_uci("stockfish") as engine:
        board = chess.Board(board_fen)
        result = engine.play(board, chess.engine.Limit(time=2))
        return result.move
