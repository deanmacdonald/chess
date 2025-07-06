import pygame
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
print("Runtime dir:", os.getenv("XDG_RUNTIME_DIR"))

# Initialize Pygame
pygame.init()

# Constants
WIDTH, HEIGHT = 600, 600
ROWS, COLS = 8, 8
SQUARE_SIZE = WIDTH // COLS

# Colors
WHITE = (255, 255, 255)
BLACK = (100, 100, 100)

# Create game window
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Chess Game")

# Chess board layout
board = [
    ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
    ['bP'] * 8,
    ['--'] * 8,
    ['--'] * 8,
    ['--'] * 8,
    ['--'] * 8,
    ['wP'] * 8,
    ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR']
]

# Load and scale chess piece images from correct asset path
def load_images():
    piece_images = {}
    assets_dir = os.path.join(os.path.dirname(__file__), "..", "public", "assets")

    for filename in os.listdir(assets_dir):
        if filename.endswith(".png"):
            name = filename.split(".")[0]  # 'bK', 'wQ', etc.
            path = os.path.join(assets_dir, filename)
            image = pygame.image.load(path)
            scaled_image = pygame.transform.scale(image, (SQUARE_SIZE, SQUARE_SIZE))
            piece_images[name] = scaled_image
    return piece_images

# Draw board squares
def draw_board():
    for row in range(ROWS):
        for col in range(COLS):
            color = WHITE if (row + col) % 2 == 0 else BLACK
            pygame.draw.rect(screen, color, (col * SQUARE_SIZE, row * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE))

# Draw chess pieces
def draw_pieces(images):
    for row in range(ROWS):
        for col in range(COLS):
            piece = board[row][col]
            if piece != "--" and piece in images:
                screen.blit(images[piece], (col * SQUARE_SIZE, row * SQUARE_SIZE))

# Main loop
def main():
    clock = pygame.time.Clock()
    piece_images = load_images()
    running = True

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        draw_board()
        draw_pieces(piece_images)
        pygame.display.flip()
        clock.tick(60)

    pygame.quit()

if __name__ == "__main__":
    main()

