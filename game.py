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

# Create the game window
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Chess Game")

# Load Assets (Placeholder: Replace with actual piece images)
pawn_img = pygame.Surface((50, 50))
pawn_img.fill((200, 200, 200))

# Chess Board Initialization
board = [[None] * 8 for _ in range(8)]
board[6][4] = "pawn"  # Example placement (White Pawn at e2)

# Function to draw the board
def draw_board():
    for row in range(8):
        for col in range(8):
            color = WHITE if (row + col) % 2 == 0 else BLACK
            pygame.draw.rect(screen, color, (col * SQUARE_SIZE, row * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE))

            # Draw pieces
            if board[row][col] == "pawn":
                screen.blit(pawn_img, (col * SQUARE_SIZE + 12, row * SQUARE_SIZE + 12))

# AI Random Move Function
def ai_move():
    moves = [(6, 4, 5, 4), (6, 3, 5, 3)]  # Pawn moving forward
    move = random.choice(moves)
    board[move[2]][move[3]] = board[move[0]][move[1]]
    board[move[0]][move[1]] = None

# Main Game Loop
running = True
while running:
    screen.fill(BLACK)
    draw_board()
    pygame.display.update()

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
            ai_move()  # AI moves when space is pressed

pygame.quit()
