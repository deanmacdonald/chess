import pygame
import random

# Initialize Pygame
pygame.init()

# Constants
WIDTH, HEIGHT = 600, 600
SQUARE_SIZE = WIDTH // 8
BLACK, WHITE = (0, 0, 0), (255, 255, 255)

# Set up display
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Chess AI")

# Chess board representation
board = [[None] * 8 for _ in range(8)]  # Simplified representation

# AI Move Function
def ai_move():
    moves = [(6, 4, 5, 4), (6, 3, 5, 3)]  # Example pawn moves
    move = random.choice(moves)
    
    board[move[2]][move[3]] = board[move[0]][move[1]]
    board[move[0]][move[1]] = None

# Drawing the chessboard
def draw_board():
    for row in range(8):
        for col in range(8):
            color = WHITE if (row + col) % 2 == 0 else BLACK
            pygame.draw.rect(screen, color, (col * SQUARE_SIZE, row * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE))

# Main Game Loop
running = True
while running:
    screen.fill(BLACK)
    draw_board()
    pygame.display.update()

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:
                ai_move()  # AI moves when space is pressed

pygame.quit()
