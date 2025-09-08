import pygame
import logging
import os

TEXT_COLOR = (0, 0, 0)  # Fallback text color

class Renderer:
    def __init__(self, screen, board, tile_size=80):
        self.screen = screen
        self.board = board
        self.tile_size = tile_size
        self.font = pygame.font.SysFont("DejaVu Sans", self.tile_size - 10)
        self.image_cache = {}  # Cache loaded images for performance

    def run(self):
        running = True
        clock = pygame.time.Clock()
        while running:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False

            self.draw_board()
            pygame.display.flip()
            clock.tick(60)

    def draw_board(self):
        for row in range(8):
            for col in range(8):
                self.draw_tile(row, col)
                piece = self.board[row][col]
                if piece:
                    self.draw_piece(piece, col, row)

    def draw_tile(self, row, col):
        color = (235, 235, 208) if (row + col) % 2 == 0 else (119, 148, 85)
        rect = pygame.Rect(
            col * self.tile_size,
            row * self.tile_size,
            self.tile_size,
            self.tile_size
        )
        pygame.draw.rect(self.screen, color, rect)

    def draw_piece(self, piece, col, row):
        try:
            image_path = piece.get_image_path()
            if image_path not in self.image_cache:
                if os.path.exists(image_path):
                    image = pygame.image.load(image_path)
                    image = pygame.transform.scale(image, (self.tile_size, self.tile_size))
                    self.image_cache[image_path] = image
                else:
                    logging.warning(f"Image not found: {image_path}")
                    self.image_cache[image_path] = None

            image = self.image_cache.get(image_path)
            x = col * self.tile_size
            y = row * self.tile_size

            if image:
                self.screen.blit(image, (x, y))
            else:
                symbol = piece.symbol() if callable(piece.symbol) else str(piece.symbol)
                text = self.font.render(symbol, True, TEXT_COLOR)
                self.screen.blit(text, (x + self.tile_size // 4, y + self.tile_size // 4))

        except Exception as e:
            logging.error(f"Error drawing piece at ({row}, {col}): {e}")

    def animate_move(self, piece, start_pos, end_pos, duration=200):
        try:
            start_x = start_pos[1] * self.tile_size
            start_y = start_pos[0] * self.tile_size
            end_x = end_pos[1] * self.tile_size
            end_y = end_pos[0] * self.tile_size

            image_path = piece.get_image_path()
            image = self.image_cache.get(image_path)

            if not image:
                if os.path.exists(image_path):
                    image = pygame.image.load(image_path)
                    image = pygame.transform.scale(image, (self.tile_size, self.tile_size))
                    self.image_cache[image_path] = image
                else:
                    logging.warning(f"Animation image not found: {image_path}")
                    return

            start_time = pygame.time.get_ticks()
            while True:
                now = pygame.time.get_ticks()
                elapsed = now - start_time
                if elapsed >= duration:
                    break

                progress = elapsed / duration
                current_x = start_x + (end_x - start_x) * progress
                current_y = start_y + (end_y - start_y) * progress

                self.draw_board()
                self.screen.blit(image, (current_x, current_y))
                pygame.display.flip()
                pygame.time.delay(10)

        except Exception as e:
            logging.error(f"Error animating move from {start_pos} to {end_pos}: {e}")

