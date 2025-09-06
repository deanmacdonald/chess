import pygame

class Board:
    def __init__(self):
        self.grid = self.create_board()

    def create_board(self):
        return [["" for _ in range(8)] for _ in range(8)]

    def draw(self, surface):
        tile_size = 80  # pixels
        colors = [(240, 217, 181), (181, 136, 99)]  # light and dark squares

        for row in range(8):
            for col in range(8):
                color = colors[(row + col) % 2]
                rect = pygame.Rect(col * tile_size, row * tile_size, tile_size, tile_size)
                pygame.draw.rect(surface, color, rect)

