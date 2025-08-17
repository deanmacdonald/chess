import pygame

class Game:
    def __init__(self, board):
        """
        Initialize the Game instance.
        board: 2D list representing the chess board.
        """
        self.board = board
        self.turn = 'white'  # Track current player's turn
        self.selected_piece = None
        self.valid_moves = []

    def switch_turn(self):
        """Toggle the turn between white and black."""
        self.turn = 'black' if self.turn == 'white' else 'white'

    def select_piece(self, row, col):
        """
        Select a piece at a given board location.
        Returns True if selection is valid.
        """
        try:
            piece = self.board[row][col]
        except IndexError:
            self.selected_piece = None
            self.valid_moves = []
            return False

        if piece and self.is_correct_turn(piece):
            self.selected_piece = (row, col)
            self.valid_moves = self.get_valid_moves(row, col)
            return True
        else:
            self.selected_piece = None
            self.valid_moves = []
            return False

    def is_correct_turn(self, piece):
        """
        Check if the piece belongs to the current player.
        Assumes uppercase = white, lowercase = black.
        """
        return (piece.isupper() and self.turn == 'white') or \
               (piece.islower() and self.turn == 'black')

    def get_valid_moves(self, row, col):
        """
        Returns a list of valid moves for the selected piece.
        This is currently a stub.
        """
        # TODO: Implement actual chess rules
        return []

    def move_piece(self, dest_row, dest_col):
        """
        Move selected piece to a destination square.
        """
        if not self.selected_piece:
            return False

        if (dest_row, dest_col) in self.valid_moves:
            src_row, src_col = self.selected_piece
            self.board[dest_row][dest_col] = self.board[src_row][src_col]
            self.board[src_row][src_col] = ''
            self.switch_turn()
            self.selected_piece = None
            self.valid_moves = []
            return True
        return False
