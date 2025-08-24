import pygame
from config import SCREEN_WIDTH, SCREEN_HEIGHT, FPS

class Renderer:
    def __init__(self, board):
        pygame.init()
        self.screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
        self.clock = pygame.time.Clock()
        self.board = board

    def run(self):
        running = True
        while running:
            self.clock.tick(FPS)
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
            self.screen.fill((255, 255, 255))
            pygame.display.flip()
        pygame.quit()
