import pygame

pygame.init()
screen_size = 480
square_size = screen_size // 8
screen = pygame.display.set_mode((screen_size, screen_size))
pygame.display.set_caption("Chess with Turns")

# Colors
WHITE = (255, 255, 255)
BLACK = (100, 100, 100)
PIECE_WHITE = (220, 220, 255)
PIECE_BLACK = (30, 30, 80)

# Game state
pieces = [
    {"type": "pawn", "color": "white", "pos": [4, 6]},
    {"type": "pawn", "color": "black", "pos": [4, 1]}
]
turn = "white"
dragging = None

def draw_board():
    for row in range(8):
        for col in range(8):
            color = WHITE if (row + col) % 2 == 0 else BLACK
            pygame.draw.rect(screen, color, pygame.Rect(
                col * square_size, row * square_size, square_size, square_size))

def draw_pieces():
    for p in pieces:
        color = PIECE_WHITE if p["color"] == "white" else PIECE_BLACK
        x = p["pos"][0] * square_size + square_size // 2
        y = p["pos"][1] * square_size + square_size // 2
        pygame.draw.circle(screen, color, (x, y), square_size // 3)

def get_piece_at(col, row):
    for p in pieces:
        if p["pos"] == [col, row] and p["color"] == turn:
            return p
    return None

def capture_piece_at(col, row):
    global pieces
    pieces = [p for p in pieces if p["pos"] != [col, row] or p["color"] == dragging["color"]]

# Game loop
running = True
while running:
    screen.fill((0, 0, 0))
    draw_board()
    draw_pieces()

    mouse_x, mouse_y = pygame.mouse.get_pos()
    mouse_col, mouse_row = mouse_x // square_size, mouse_y // square_size

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        elif event.type == pygame.MOUSEBUTTONDOWN:
            dragging = get_piece_at(mouse_col, mouse_row)

        elif event.type == pygame.MOUSEBUTTONUP:
            if dragging:
                capture_piece_at(mouse_col, mouse_row)
                dragging["pos"] = [mouse_col, mouse_row]
                turn = "black" if turn == "white" else "white"
                dragging = None

    if dragging:
        pygame.draw.circle(screen,
            PIECE_WHITE if dragging["color"] == "white" else PIECE_BLACK,
            (mouse_x, mouse_y), square_size // 3)

    pygame.display.flip()

pygame.quit()
