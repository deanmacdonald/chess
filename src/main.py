import pygame
import os
import sys  # Replaced 'system' with 'sys' for standard system operations

from game.board import Board
from ui.renderer import Renderer

def main():
    # Initialize Pygame
    pygame.init()

    try:
        # Create game board and renderer
        board = Board()
        renderer = Renderer(board)

        # Run the game loop
        renderer.run()
    except Exception as e:
        print(f"An error occurred: {e}", file=sys.stderr)
    finally:
        # Quit Pygame gracefully
        pygame.quit()

if __name__ == "__main__":
    main()

