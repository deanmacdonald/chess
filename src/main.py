import pygame
import sys
import argparse
import logging

from game.board import Board
from ui.renderer import Renderer

def main():
    # Parse command-line arguments
    parser = argparse.ArgumentParser(description="Launch the Chess UI")
    parser.add_argument("--debug", action="store_true", help="Enable debug logging")
    args = parser.parse_args()

    # Configure logging
    logging.basicConfig(
        level=logging.DEBUG if args.debug else logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
    )

    logging.info("Welcome to Chess! Initializing...")

    # Initialize Pygame
    pygame.init()

    try:
        # Create game board and renderer
        board = Board()
        renderer = Renderer(board)

        # Run the game loop
        renderer.run()

    except Exception as e:
        logging.exception("An error occurred during execution")

    finally:
        # Quit Pygame gracefully
        pygame.quit()
        logging.info("Game exited cleanly.")

if __name__ == "__main__":
    main()

