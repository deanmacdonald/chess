import chess

def is_valid_move(board, move):
    return chess.Move.from_uci(move) in board.legal_moves

def get_hint_move(board):
    return list(board.legal_moves)[0] if board.legal_moves else None
