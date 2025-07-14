import os
import pygame
from dotenv import load_dotenv

from pieces import load_piece_images, SQUARE_SIZE
from input import get_clicked_square
from board import Board
from game import Game
from database import init_db, record_game
init_db()

player1 = "Dean"
player2 = "Guest"

# --- Setup ---
load_dotenv()
pygame.init()

WIDTH, HEIGHT = 600, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Chess Game")

# --- Intro Splash (Optional) ---
def show_intro(screen):
    font = pygame.font.SysFont(None, 48)
    text = font.render("Welcome to Dean's Chess", True, (255, 255, 255))
    screen.fill((0, 0, 0))
    screen.blit(text, (WIDTH // 2 - text.get_width() // 2, HEIGHT // 2 - text.get_height() // 2))
    pygame.display.flip()
    pygame.time.wait(1500)

# --- Assets ---
piece_images = load_piece_images()
if not piece_images:
    print("Error: No piece images loaded.")
    pygame.quit()
    exit()

print(f"Pieces loaded: {list(piece_images.keys())}")

# --- Game State ---
game = Game()
chess_board = Board(screen, piece_images, game)
game.set_board(chess_board)

# --- Main Loop ---
def main():
    show_intro(screen)
    clock = pygame.time.Clock()
    running = True

    while running:
        screen.fill((0, 0, 0))

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

            elif event.type == pygame.MOUSEBUTTONDOWN:
                pos = pygame.mouse.get_pos()
                clicked_square = get_clicked_square(pos, SQUARE_SIZE)
                game.handle_selection(clicked_square)

            elif event.type == pygame.MOUSEBUTTONUP:
                pos = pygame.mouse.get_pos()
                released_square = get_clicked_square(pos, SQUARE_SIZE)
                game.handle_move(released_square)

        chess_board.draw()
        pygame.display.flip()
        clock.tick(60)

    pygame.quit()

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"Unexpected error occurred: {e}")
        pygame.quit()

