import pygame
import copy
import chess
from piece import Piece

class Board:
    def __init__(self, screen, piece_images, game):
        self.screen = screen
        self.piece_images = piece_images
        self.game = game
        self.SQUARE_SIZE = 75
        self.grid = self._initialize_board()
        self.internal_board = chess.Board()  # python-chess board for AI logic

    def _initialize_board(self):
        board = [[None for _ in range(8)] for _ in range(8)]

        def place_row(y, color):
            types = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]
            for x, t in enumerate(types):
                board[y][x] = self._create_piece(f"{color}_{t}", (x, y))

        for x in range(8):
            board[1][x] = self._create_piece("black_pawn", (x, 1))
            board[6][x] = self._create_piece("white_pawn", (x, 6))

        place_row(0, "black")
        place_row(7, "white")

        return board

    def _create_piece(self, image_key, pos):
        color = image_key.split('_')[0]
        piece = Piece(color, pos)
        piece.set_board(self)
        return piece

    def draw(self):
        light = (235, 209, 166)
        dark = (165, 117, 81)

        for y in range(8):
            for x in range(8):
                square_color = light if (x + y) % 2 == 0 else dark
                pygame.draw.rect(
                    self.screen,
                    square_color,
                    pygame.Rect(x * self.SQUARE_SIZE, y * self.SQUARE_SIZE, self.SQUARE_SIZE, self.SQUARE_SIZE)
                )

                piece = self.grid[y][x]
                if piece:
                    key = f"{piece.color}_{piece.__class__.__name__.lower()}"
                    img = self.piece_images.get(key)
                    if img:
                        self.screen.blit(img, (x * self.SQUARE_SIZE, y * self.SQUARE_SIZE))

    def get_piece_at(self, pos):
        x, y = pos
        if 0 <= x < 8 and 0 <= y < 8:
            return self.grid[y][x]
        return None

    def move_piece(self, from_pos, to_pos):
        piece = self.get_piece_at(from_pos)
        if not piece:
            return

        self.grid[to_pos[1]][to_pos[0]] = piece
        self.grid[from_pos[1]][from_pos[0]] = None
        piece.position = to_pos

    def push_chess_move(self, move):
        self.internal_board.push(move)
        self.sync_visual_board()

    def sync_visual_board(self):
        """Optional: Update grid if internal_board was changed externally"""
        # You’d need logic here to map from FEN to grid/pieces
        pass  # Placeholder

    def get_chess_board(self):
        return self.internal_board

    def get_all_pieces(self):
        pieces = []
        for row in self.grid:
            for p in row:
                if p:
                    pieces.append(p)
        return pieces

    def clone(self):
        cloned_board = copy.deepcopy(self)
        for row in cloned_board.grid:
            for piece in row:
                if piece:
                    piece.set_board(cloned_board)
        return cloned_board

    def is_in_check(self, color):
        king_pos = self._find_king(color)
        if not king_pos:
            return False

        for row in self.grid:
            for piece in row:
                if piece and piece.color != color:
                    moves = piece.get_valid_moves(check_check=False)
                    if king_pos in moves:
                        return True
        return False

    def _find_king(self, color):
        for y in range(8):
            for x in range(8):
                piece = self.grid[y][x]
                if piece and piece.color == color and piece.__class__.__name__.lower() == "king":
                    return (x, y)
        return None

