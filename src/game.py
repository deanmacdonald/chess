from ai import ChessAI
from database import record_game

class Game:
    def __init__(self):
        self.board = None
        self.selected_piece = None
        self.legal_moves = []
        self.move_log = []
        self.player_white = "Dean"
        self.player_black = "Guest"
        self.current_turn = "white"
        self.game_over = False
        self.ai = ChessAI("black")  # Black plays as AI
        self.en_passant_target = None

    def set_board(self, board):
        self.board = board

    def handle_selection(self, square):
        if self.game_over:
            return

        piece = self.board.get_piece(square)
        if piece and piece.color == self.current_turn:
            self.selected_piece = piece
            self.legal_moves = piece.get_valid_moves(self.board)

            print(f"Selected {piece} at {square}")

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
            self.current_turn = "black"

            if self.is_game_over():
                self.end_game()
                return

            # Let the AI respond
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
            self.current_turn = "white"

            if self.is_game_over():
                self.end_game()

    def is_game_over(self):
        # You can expand this with real checkmate/draw detection
        return False

    def end_game(self):
        self.game_over = True
        result = f"{self.current_turn} loses"
        print(f"Game ended: {result}")

        record_game(
            self.player_white,
            self.player_black,
            result,
            self.move_log
        )

