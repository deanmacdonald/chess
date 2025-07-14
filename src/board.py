import pygame
from pieces import SQUARE_SIZE, WHITE, BLACK
from typing import Tuple, List
from piece import Piece

class Board:
    def __init__(self, screen, piece_images, game):
        self.screen = screen
        self.piece_images = piece_images
        self.game = game
        self.current_turn = "white"
        self.board_state = [[None for _ in range(8)] for _ in range(8)]
        self.setup_board()

    def setup_board(self):
        layout = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]
        for col in range(8):
            self.board_state[0][col] = Piece("black", layout[col], (0, col))
            self.board_state[1][col] = Piece("black", "pawn", (1, col))
            self.board_state[6][col] = Piece("white", "pawn", (6, col))
            self.board_state[7][col] = Piece("white", layout[col], (7, col))

    def get_piece(self, square: Tuple[int, int]):
        row, col = square
        return self.board_state[row][col] if self.is_within_bounds(square) else None

    def get_piece_at(self, square: Tuple[int, int]):
        return self.get_piece(square)  # Maintains compatibility with older calls
    
    def get_all_pieces(self):
       return [p for row in self.board_state for p in row if p]

    def is_within_bounds(self, square: Tuple[int, int]):
        r, c = square
        return 0 <= r < 8 and 0 <= c < 8

    def is_empty(self, square: Tuple[int, int]):
        return self.is_within_bounds(square) and self.get_piece(square) is None

    def is_enemy(self, square: Tuple[int, int], color: str):
        p = self.get_piece(square)
        return p is not None and p.color != color

    def is_friendly(self, square: Tuple[int, int], color: str):
        p = self.get_piece(square)
        return p is not None and p.color == color

    def move_piece(self, start: Tuple[int, int], end: Tuple[int, int]):
        sr, sc = start
        piece = self.board_state[sr][sc]
        if piece:
            self.board_state[sr][sc] = None
            self.board_state[end[0]][end[1]] = piece
            piece.position = end
            piece.has_moved = True

    def remove_piece_at(self, square: Tuple[int, int]):
        r, c = square
        if self.is_within_bounds(square):
            self.board_state[r][c] = None

    def toggle_turn(self):
        self.current_turn = "black" if self.current_turn == "white" else "white"

    def draw_board_tiles(self):
        for r in range(8):
            for c in range(8):
                color = (255, 255, 255) if (r + c) % 2 == 0 else (220, 20, 60)
                pygame.draw.rect(self.screen, color, (c * SQUARE_SIZE, r * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE))

    def draw_pieces(self):
        for r in range(8):
            for c in range(8):
                piece = self.board_state[r][c]
                if piece:
                    key = piece.get_image_key()
                    img = self.piece_images.get(key)
                    if img:
                        self.screen.blit(img, (c * SQUARE_SIZE, r * SQUARE_SIZE))

    def draw_highlights(self, moves: List[Tuple[int, int]]):
        for square in moves:
            rect = pygame.Rect(square[1] * SQUARE_SIZE, square[0] * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE)
            pygame.draw.rect(self.screen, (0, 0, 255), rect, 3)

    def draw(self):
        self.draw_board_tiles()
        self.draw_pieces()
        if self.game.selected_piece:
            self.draw_highlights(self.game.legal_moves)

    def can_castle(self, color: str, side: str) -> bool:
      # Placeholder logic — always allow for now
       return True

    def animate_move(self, start_pos: Tuple[int, int], end_pos: Tuple[int, int], piece_key: str):
        frames = 10
        sx = start_pos[1] * SQUARE_SIZE
        sy = start_pos[0] * SQUARE_SIZE
        ex = end_pos[1] * SQUARE_SIZE
        ey = end_pos[0] * SQUARE_SIZE
        dx = (ex - sx) / frames
        dy = (ey - sy) / frames

        for frame in range(frames):
            self.draw_board_tiles()
            self.draw_pieces()
            x = sx + dx * frame
            y = sy + dy * frame
            img = self.piece_images.get(piece_key)
            if img:
                self.screen.blit(img, (x, y))
            pygame.display.flip()
            pygame.time.delay(30)

