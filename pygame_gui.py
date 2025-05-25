import pygame

# Initialize pygame
pygame.init()

# Set up display
WIDTH, HEIGHT = 400, 400
ROWS = 8
COLS = 8
SQUARE_SIZE = WIDTH // COLS
WIN = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Chess Game")

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Draw the chessboard
def draw_board():
    for row in range(ROWS):
        for col in range(COLS):
            color = WHITE if (row + col) % 2 == 0 else BLACK
            pygame.draw.rect(WIN, color, (col*SQUARE_SIZE, row*SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE))

# Main loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    draw_board()
    pygame.display.flip()

pygame.quit()
