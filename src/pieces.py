import os
import pygame

# Color constants
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Board layout constant
SQUARE_SIZE = 75

def load_piece_images():
    """
    Loads and scales chess piece images from the assets directory.
    Returns a dictionary keyed by 'color_piece' e.g. 'white_queen'.
    """
    piece_images = {}
    base_dir = os.path.dirname(__file__)
    image_dir = os.path.join(base_dir, "assets", "pieces")

    piece_types = ["pawn", "knight", "bishop", "rook", "queen", "king"]
    colors = ["white", "black"]

    for color in colors:
        for piece in piece_types:
            key = f"{color}_{piece}"
            filename = f"{key}.png"
            path = os.path.join(image_dir, filename)

            try:
                image = pygame.image.load(path).convert_alpha()
                scaled = pygame.transform.scale(image, (SQUARE_SIZE, SQUARE_SIZE))
                piece_images[key] = scaled
            except pygame.error as e:
                print(f"Failed to load image '{filename}': {e}")
                piece_images[key] = None  # You can optionally set a default placeholder here

    return piece_images

