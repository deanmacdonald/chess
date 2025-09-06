import pygame

class Piece:
    def __init__(self, name, color, position):
        self.name = name  # e.g., "P" for pawn, "K" for king
        self.color = color  # "white" or "black"
        self.position = position  # (row, col)

    def draw(self, surface, tile_size):
        font = pygame.font.SysFont(None, 48)
        symbol = self.name.upper() if self.color == "white" else self.name.lower()
        text = font.render(symbol, True, (0, 0, 0) if self.color == "black" else (255, 255, 255))
        x = self.position[1] * tile_size + tile_size // 4
        y = self.position[0] * tile_size + tile_size // 4
        surface.blit(text, (x, y))

