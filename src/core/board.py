import pygame
from pieces import Piece

# Board settings
WIDTH, HEIGHT = 640, 640
SQUARE_SIZE = WIDTH // 8
WHITE = (245, 245, 245)
GRAY = (100, 100, 100)
LIGHT = (240, 217, 181)
DARK = (181, 136, 99)

# Piece images (make sure these exist in your assets folder!)
PIECE_IMAGES = {}

def load_piece_images():
    types = ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king']
    colors = ['white', 'black']
    for color in colors:
        for t in types:
            key = f"{t}_{color}"
            PIECE_IMAGES[key] = pygame.image.load(f"assets/{key}.png")

def chess_notation_to_xy(pos):
    file = ord(pos[0]) - ord('a')
    rank = 8 - int(pos[1])
    return file * SQUARE_SIZE, rank * SQUARE_SIZE

class ChessBoard:
    def __init__(self):
        self.pieces = self.setup_pieces()

    def setup_pieces(self):
        positions = {}
        for file in "abcdefgh":
            positions[f"{file}2"] = Piece("pawn", "white", f"{file}2")
            positions[f"{file}7"] = Piece("pawn", "black", f"{file}7")
        order = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]
        for i, piece_type in enumerate(order):
            col = chr(ord("a") + i)
            positions[f"{col}1"] = Piece(piece_type, "white", f"{col}1")
            positions[f"{col}8"] = Piece(piece_type, "black", f"{col}8")
        return positions

    def draw(self, screen):
        font = pygame.font.SysFont("Arial", 18)
        for row in range(8):
            for col in range(8):
                color = LIGHT if (row + col) % 2 == 0 else DARK
                pygame.draw.rect(screen, color, (col * SQUARE_SIZE, row * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE))

                # Draw rank and file
                if col == 0:
                    screen.blit(font.render(str(8 - row), True, GRAY), (5, row * SQUARE_SIZE + 5))
                if row == 7:
                    screen.blit(font.render(chr(ord('a') + col), True, GRAY), (col * SQUARE_SIZE + SQUARE_SIZE - 20, HEIGHT - 20))

        for pos, piece in self.pieces.items():
            x, y = chess_notation_to_xy(pos)
            image = PIECE_IMAGES[f"{piece.piece_type}_{piece.color}"]
            screen.blit(pygame.transform.scale(image, (SQUARE_SIZE, SQUARE_SIZE)), (x, y))

