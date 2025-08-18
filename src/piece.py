from typing import List, Tuple, Optional, Dict
import pygame
import copy

# 🟥 Constants
SQUARE_SIZE = 80  # Default size of a square for rendering pieces (can be adjusted)

# 🎨 Load piece images
def load_piece_images() -> Dict[str, pygame.Surface]:
    """
    Loads chess piece images from the 'images' directory, scales them to SQUARE_SIZE,
    and returns a dictionary keyed by piece codes like 'wp' for white pawn, 'bk' for black king.
    """
    piece_codes = ['wp', 'bp', 'wr', 'br', 'wn', 'bn', 'wb', 'bb', 'wq', 'bq', 'wk', 'bk']
    images = {}
    for code in piece_codes:
        path = f"images/{code}.png"
        image = pygame.image.load(path)
        images[code] = pygame.transform.scale(image, (SQUARE_SIZE, SQUARE_SIZE))
    return images

# ♟️ Base Piece class
class Piece:
    def __init__(self, color: str, position: Tuple[int, int]):
        self.color = color                    # 'white' or 'black'
        self.position = position              # (x, y) on board
        self.board: Optional['Board'] = None  # Board this piece belongs to

    def set_board(self, board: 'Board'):
        self.board = board

    def get_valid_moves(self, check_check: bool = True) -> List[Tuple[int, int]]:
        """
        Get all valid moves. Filters out moves that would leave the king in check.
        """
        raw_moves = self._generate_raw_moves()

        if not check_check or not self.board:
            return raw_moves

        valid_moves = []
        for move in raw_moves:
            simulated_board = self.board.clone()
            simulated_board.move_piece(self.position, move)

            if not simulated_board.is_in_check(self.color):
                valid_moves.append(move)

        return valid_moves

    def _generate_raw_moves(self) -> List[Tuple[int, int]]:
        """
        Override in subclass for piece-specific movement.
        """
        return []

    def __repr__(self):
        return f"{self.color.capitalize()} {self.__class__.__name__} at {self.position}"

