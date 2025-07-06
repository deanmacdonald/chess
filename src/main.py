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

# Load and scale all chess piece images from the corrected path
def load_images():
    pieces = ['bK', 'bQ', 'bR', 'bB', 'bN', 'bP',
              'wK', 'wQ', 'wR', 'wB', 'wN', 'wP']
    images = {}
    for piece in pieces:
        path = os.path.join("..", "public", "assets", f"{piece}.png")  # Adjusted path here
        try:
            image = pygame.image.load(path)
            images[piece] = pygame.transform.scale(image, (SQUARE_SIZE, SQUARE_SIZE))
        except pygame.error as e:
            print(f"Couldn't load {path}: {e}")
    return images

piece_images = load_images()

# Draw the chessboard tiles
def draw_board():
    for row in range(ROWS):
        for col in range(COLS):
            color = WHITE if (row + col) % 2 == 0 else BLACK
            rect = pygame.Rect(col * SQUARE_SIZE, row * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE)
            pygame.draw.rect(screen, color, rect)

# Draw the chess pieces
def draw_pieces():
    for row in range(ROWS):
        for col in range(COLS):
            piece = board[row][col]
            if piece != '--':
                image = piece_images.get(piece)
                if image:
                    screen.blit(image, (col * SQUARE_SIZE, row * SQUARE_SIZE))

# Main loop
def main():
    running = True
    while running:
        draw_board()
        draw_pieces()
        pygame.display.flip()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

    pygame.quit()

if __name__ == "__main__":
    main()

