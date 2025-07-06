import pygame
import random
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
print(os.getenv("XDG_RUNTIME_DIR"))

# Initialize Pygame
pygame.init()

# Constants
WIDTH, HEIGHT = 600, 600
SQUARE_SIZE = WIDTH // 8
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (180, 180, 180)

# Create the game window
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Chess Game")

# Load Assets (Placeholder: Replace with actual piece images)
pawn_img = pygame.Surface((50, 50))
pawn_img.fill(GRAY)

# Chess Board Initialization
board = [[None] * 8 for _ in range(8)]
board[6][4] = "pawn"  # Player pawn
board[1][3] = "ai_pawn"  # AI pawn

selected = None
player_turn = True

def draw_board():
    for row in range(8):
        for col in range(8):
            color = WHITE if (row + col) % 2 == 0 else BLACK
            pygame.draw.rect(screen, color, (col * SQUARE_SIZE, row * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE))

            piece = board[row][col]
            if piece in ("pawn", "ai_pawn"):
                screen.blit(pawn_img, (col * SQUARE_SIZE + 12, row * SQUARE_SIZE + 12))

def ai_move():
    global player_turn
    for row in range(7):
        for col in range(8):
            if board[row][col] == "ai_pawn" and board[row + 1][col] is None:
                board[row + 1][col] = "ai_pawn"
                board[row][col] = None
                player_turn = True
                return

def get_square_under_mouse(pos):
    x, y = pos
    return y // SQUARE_SIZE, x // SQUARE_SIZE

# Main Game Loop
running = True
while running:
    screen.fill(BLACK)
    draw_board()
    pygame.display.update()

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        elif player_turn and event.type == pygame.MOUSEBUTTONDOWN:
            row, col = get_square_under_mouse(pygame.mouse.get_pos())
            if selected:
                sel_row, sel_col = selected
                if board[sel_row][sel_col] == "pawn" and row == sel_row - 1 and col == sel_col and board[row][col] is None:
                    board[row][col] = "pawn"
                    board[sel_row][sel_col] = None
                    selected = None
                    player_turn = False
                else:
                    selected = None
            elif board[row][col] == "pawn":
                selected = (row, col)

    if not player_turn:
        pygame.time.delay(500)
        ai_move()

pygame.quit()
