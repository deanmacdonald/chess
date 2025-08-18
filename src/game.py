from ai import ChessAI
from database import record_game
from board import Board
from piece import Piece

class Game:
    def __init__(self):
        self.board: Board = None
        self.selected_piece: Piece = None
        self.legal_moves = []
        self.move_log = []
        self.player_white = "Dean"
        self.player_black = "DeanBot"
        self.current_turn = "white"
        self.game_over = False
        self.en_passant_target = None
        self.checkmate = False
        self.stalemate = False
        self.ai = ChessAI("black")

    def set_board(self, board: Board):
        self.board = board

    def handle_selection(self, square):
        if self.game_over:
            return

        piece = self.board.get_piece(square)
        if piece and piece.color == self.current_turn:
            self.selected_piece = piece
            self.legal_moves = piece.get_valid_moves()
            print(f"Selected {piece} at {square}")
        else:
            self.selected_piece = None
            self.legal_moves = []

    def handle_move(self, target_square):
        if self.game_over or not self.selected_piece:
            print("Invalid move attempt.")
            return

        if target_square in self.legal_moves:
            start_square = self.selected_piece.position
            self.board.move_piece(start_square, target_square)
            self.move_log.append(f"{start_square}→{target_square}")
            self.selected_piece = None
            self.legal_moves = []

            if self.is_game_over():
                self.end_game()
                return

            self.current_turn = "black"

            if self.is_ai_turn():
                self.ai_move()
        else:
            print("Invalid move attempt.")
            self.selected_piece = None
            self.legal_moves = []

    def ai_move(self):
        move = self.ai.choose_move(self.board)
        if move:
            start, end = move
            self.board.move_piece(start, end)
            self.move_log.append(f"{start}→{end}")

            if self.is_game_over():
                self.end_game()
                return

            self.current_turn = "white"

    def push_move(self, move):
        """Used by Stockfish to push a python-chess Move object"""
        self.board.push_chess_move(move)
        self.move_log.append(str(move))
        self.current_turn = "white" if self.current_turn == "black" else "black"

    def get_board_state(self):
        """Returns a python-chess.Board object for Stockfish"""
        return self.board.get_chess_board()

    def is_ai_turn(self):
        return self.current_turn == "black" and not self.game_over

    def is_game_over(self):
        opponent_color = "black" if self.current_turn == "white" else "white"
        opponent_pieces = [p for p in self.board.get_all_pieces() if p.color == opponent_color]

        for piece in opponent_pieces:
            if piece.get_valid_moves():
                return False

        self.checkmate = True
        return True

    def end_game(self):
        self.game_over = True
        winner = "white" if self.current_turn == "black" else "black"
        result = f"{winner} wins by checkmate"
        print(f"Game ended: {result}")

        record_game(
            self.player_white,
            self.player_black,
            result,
            self.move_log
        )

