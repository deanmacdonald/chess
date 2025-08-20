import pygame

pygame.init()
screen_size = 480
square_size = screen_size // 8
screen = pygame.display.set_mode((screen_size, screen_size))
pygame.display.set_caption("Chessboard with Pieces")

WHITE = (255, 255, 255)
BLACK = (100, 100, 100)
PIECE_WHITE = (220, 220, 255)
PIECE_BLACK = (30, 30, 80)

# Draw the board
for row in range(8):
    for col in range(8):
        color = WHITE if (row + col) % 2 == 0 else BLACK
        pygame.draw.rect(
            screen,
            color,
            pygame.Rect(col * square_size, row * square_size, square_size, square_size)
        )

# Add test pieces (example: pawns on row 1 and 6)
for col in range(8):
    # Black pawns
    pygame.draw.circle(
        screen,
        PIECE_BLACK,
        (col * square_size + square_size // 2, square_size + square_size // 2),
        square_size // 3
    )
    # White pawns
    pygame.draw.circle(
        screen,
        PIECE_WHITE,
        (col * square_size + square_size // 2, 6 * square_size + square_size // 2),
        square_size // 3
    )

pygame.display.flip()

# Event loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

pygame.quit()
