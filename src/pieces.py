# src/pieces.py

from typing import List, Tuple
import pygame
from src.piece import Piece

# ──── Image Loading ──────────────────────────────────────────────────────
def load_piece_images() -> dict:
    images = {}
    pieces = ["pawn", "rook", "knight", "bishop", "queen", "king"]
    colors = ["white", "black"]
    for color in colors:
        for piece in pieces:
            img_path = f"public/assets/{color}_{piece}.png"
            images[f"{color}_{piece}"] = pygame.image.load(img_path)
    return images

SQUARE_SIZE = 80  # Set this to match your UI scaling

# ──── Pawn ───────────────────────────────────────────────────────────────
class Pawn(Piece):
    def _generate_raw_moves(self) -> List[Tuple[int, int]]:
        x, y = self.position
        direction = -1 if self.color == "white" else 1
        moves = []

        forward = (x, y + direction)
        if self.board.is_empty(forward):
            moves.append(forward)

            start_row = 6 if self.color == "white" else 1
            two_step = (x, y + 2 * direction)
            if y == start_row and self.board.is_empty(two_step):
                moves.append(two_step)

        for dx in [-1, 1]:
            capture = (x + dx, y + direction)
            if self.board.is_enemy_piece(capture, self.color):
                moves.append(capture)

        moves = [('promote', m) if m[1] in [0, 7] else m for m in moves]
        return moves

# ──── Rook ───────────────────────────────────────────────────────────────
class Rook(Piece):
    def _generate_raw_moves(self) -> List[Tuple[int, int]]:
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        return self.board.generate_linear_moves(self.position, directions, self.color)

# ──── Knight ─────────────────────────────────────────────────────────────
class Knight(Piece):
    def _generate_raw_moves(self) -> List[Tuple[int, int]]:
        x, y = self.position
        offsets = [
            (1, 2), (2, 1), (-1, 2), (-2, 1),
            (1, -2), (2, -1), (-1, -2), (-2, -1),
        ]
        jumps = [(x + dx, y + dy) for dx, dy in offsets]
        return [pos for pos in jumps if self.board.is_valid_knight_move(pos, self.color)]

# ──── Bishop ─────────────────────────────────────────────────────────────
class Bishop(Piece):
    def _generate_raw_moves(self) -> List[Tuple[int, int]]:
        directions = [(1, 1), (-1, 1), (1, -1), (-1, -1)]
        return self.board.generate_linear_moves(self.position, directions, self.color)

# ──── Queen ──────────────────────────────────────────────────────────────
class Queen(Piece):
    def _generate_raw_moves(self) -> List[Tuple[int, int]]:
        directions = [
            (1, 0), (-1, 0), (0, 1), (0, -1),
            (1, 1), (-1, 1), (1, -1), (-1, -1),
        ]
        return self.board.generate_linear_moves(self.position, directions, self.color)

# ──── King ───────────────────────────────────────────────────────────────
class King(Piece):
    def _generate_raw_moves(self) -> List[Tuple[int, int]]:
        x, y = self.position
        moves = [
            (x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1),
            (x + 1, y + 1), (x - 1, y + 1), (x + 1, y - 1), (x - 1, y - 1),
        ]

        if not self.has_moved:
            for rook_pos in [(0, y), (7, y)]:
                rook = self.board.get_piece_at(rook_pos)
                if rook and isinstance(rook, Rook) and not rook.has_moved:
                    if self.board.can_castle_through(self.position, rook_pos, self.color):
                        direction = 2 if rook_pos[0] > x else -2
                        moves.append((x + direction, y))

        return [m for m in moves if self.board.is_valid_king_move(m, self.color)]

