import os
import pygame
from dotenv import load_dotenv

from pieces import load_piece_images, SQUARE_SIZE
from src.input import get_clicked_square
from src.board import Board
from src.game import Game
from src.database import init_db, record_game

import chess
import chess.engine

# --- Environment Setup ---
load_dotenv()
init_db()

# --- Game Configuration ---
PLAYER1 = "Dean"
PLAYER2 = "Guest"
WIDTH, HEIGHT = 600, 600
FPS = 60
STOCKFISH_PATH = "C:/Program Files/Stockfish/stockfish.exe"  # Update if installed elsewhere

# --- Initialize Pygame ---
pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Dean's Chess")

# --- Font Fallback ---
def load_font(size):
    try:
        return pygame.font.SysFont(None, size)
    except Exception:
        font_path = os.path.join("assets", "fonts", "RobotoMono-Regular.ttf")
        return pygame.font.Font(font_path, size)

# --- Intro Splash ---
def show_intro(surface):
    font = load_font(48)
    text = font.render("Welcome to Dean's Chess", True, (255, 255, 255))
    surface.fill((0, 0, 0))
    surface.blit(text, (WIDTH // 2 - text.get_width() // 2, HEIGHT // 2 - text.get_height() // 2))
    pygame.display.flip()
    pygame.time.delay(1500)

# --- Game State Initialization ---
piece_images = load_piece_images()
if not piece_images:
    print("Error: No piece images loaded.")
    pygame.quit()
    exit()

print(f"Pieces loaded: {list(piece_images.keys())}")

game = Game()
chess_board = Board(screen, piece_images, game)
game.set_board(chess_board)

# --- AI Move Logic ---
def make_ai_move():
    try:
        with chess.engine.SimpleEngine.popen_uci(STOCKFISH_PATH) as engine:
            board = game.get_board_state()  # Must return a `chess.Board` object
            result = engine.play(board, chess.engine.Limit(time=0.5))
            move = result.move
            game.push_move(move)  # Should update your Board and Game class with this move
            print(f"AI move: {move}")
    except Exception as e:
        print(f"Stockfish AI error: {e}")

# --- Main Game Loop ---
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

        if game.is_ai_turn():
            make_ai_move()

        chess_board.draw()
        pygame.display.flip()
        clock.tick(FPS)

# --- Entry Point ---
if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"An error occurred: {e}")

