import pygame

# Constants
WIDTH, HEIGHT = 640, 640
SQUARE_SIZE = WIDTH // 8

# Load board and piece images
def load_images():
    # Load and scale the board background
    board_img = pygame.image.load("assets/chess_theme/board.png")
    board_img = pygame.transform.scale(board_img, (WIDTH, HEIGHT))

    # Load and scale each piece image
    pieces = ['wP', 'wR', 'wN', 'wB', 'wQ', 'wK',
              'bP', 'bR', 'bN', 'bB', 'bQ', 'bK']
    images = {}
    for piece in pieces:
        img = pygame.image.load(f"assets/chess_theme/{piece}.png")
        images[piece] = pygame.transform.scale(img, (SQUARE_SIZE, SQUARE_SIZE))

    return board_img, images

# Draw the board background
def draw_board(screen, board_img):
    screen.blit(board_img, (0, 0))

# Draw pieces on top of the board
def draw_pieces(screen, board, images):
    for row in range(8):
        for col in range(8):
            piece = board[row][col]
            if piece != "--":
                screen.blit(images[piece], (col * SQUARE_SIZE, row * SQUARE_SIZE))

