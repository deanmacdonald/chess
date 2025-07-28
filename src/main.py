import pygame
from utils import show_popup
from game import Game
from pieces import create_starting_pieces
from board import draw_board, draw_pieces
from game import get_piece_at, capture_piece_at
pieces = create_starting_pieces()


# Constants
WIDTH, HEIGHT = 640, 640
SQUARE_SIZE = WIDTH // 8

# Initialize pygame
pygame.init()
win = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Chess")

# Show welcome message
show_popup(win, "Welcome to Chess!", WIDTH, HEIGHT)

# Load piece images (stub — replace with actual loading)
piece_images = {}  # Add images keyed by piece letter, e.g. 'P', 'p', 'R', etc.

# Starting board setup
board = [
    ['r','n','b','q','k','b','n','r'],
    ['p','p','p','p','p','p','p','p'],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['P','P','P','P','P','P','P','P'],
    ['R','N','B','Q','K','B','N','R']
]

# Game state object
game = Game(board)

def draw_pieces(win, board, piece_images):
    for row in range(8):
        for col in range(8):
            piece = board[row][col]
            if piece != '' and piece in piece_images:
                win.blit(piece_images[piece], (col * SQUARE_SIZE, row * SQUARE_SIZE))

def get_clicked_pos(pos):
    x, y = pos
    return y // SQUARE_SIZE, x // SQUARE_SIZE

def main():
    run = True
    clock = pygame.time.Clock()

    while run:
        clock.tick(60)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False

            elif event.type == pygame.MOUSEBUTTONDOWN:
                row, col = get_clicked_pos(pygame.mouse.get_pos())
                if game.selected_piece:
                    game.move_piece(row, col)
                else:
                    game.select_piece(row, col)

        win.fill((200, 200, 200))  # Board background
        draw_pieces(win, game.board, piece_images)
        pygame.display.update()

    pygame.quit()

main()
