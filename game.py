import pygame
import random

# Initialize Pygame
pygame.init()

# Constants
WIDTH, HEIGHT = 600, 600
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Create the game window
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Chess Game")

# Load Assets (Replace with your actual piece images)
pawn_img = pygame.Surface((50, 50))
pawn_img.fill(WHITE)

# Chess Board
board = [[None] * 8 for _ in range(8)]
board[6][4] = "pawn"  # Example placement (White Pawn at e2)

# Function to draw the board
def draw_board():
    for row in range(8):
        for col in range(8):
            color = WHITE if (row + col) % 2 == 0 else BLACK
            pygame.draw.rect(screen, color, (col * 75, row * 75, 75, 75))
            if board[row][col] == "pawn":
                screen.blit(pawn_img, (col * 75 + 12, row * 75 + 12))

# AI Random Move (Basic)
def ai_move():
    moves = [(6, 4, 5, 4)]  # Example moves (pawn forward)
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
