import pygame
from game.board import Board
from ui.renderer import Renderer
from ui.input import InputHandler

def main():
    pygame.init()
    screen_size = 640  # 8 tiles × 80 pixels
    screen = pygame.display.set_mode((screen_size, screen_size))
    pygame.display.set_caption("PyChess")

    board = Board()
    renderer = Renderer(screen, board)
    input_handler = InputHandler(renderer, board)

    clock = pygame.time.Clock()
    running = True

    while running:
        for event in pygame.event.get():
            input_handler.handle_event(event)

        renderer.draw_board()
        pygame.display.flip()
        clock.tick(60)

    pygame.quit()

if __name__ == "__main__":
    main()

