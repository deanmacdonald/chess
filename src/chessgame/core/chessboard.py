import pygame

# Initialize Pygame
pygame.init()
screen_size = 480
square_size = screen_size // 8
screen = pygame.display.set_mode((screen_size, screen_size))
pygame.display.set_caption("Chessboard")

# Colors
WHITE = (255, 255, 255)
BLACK = (100, 100, 100)

# Draw the board
for row in range(8):
    for col in range(8):
        color = WHITE if (row + col) % 2 == 0 else BLACK
        pygame.draw.rect(
            screen,
            color,
            pygame.Rect(col * square_size, row * square_size, square_size, square_size)
        )

pygame.display.flip()

# Wait so we can see it
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

pygame.quit()
