import pygame

def show_popup(win, message, width, height):
    font = pygame.font.SysFont(None, 48)
    text = font.render(message, True, (255, 255, 255))
    text_rect = text.get_rect(center=(width // 2, height // 2))

    # Semi-transparent overlay
    overlay = pygame.Surface((width, height))
    overlay.set_alpha(180)
    overlay.fill((0, 0, 0))

    win.blit(overlay, (0, 0))
    win.blit(text, text_rect)
    pygame.display.update()

    # Pause to show message
    pygame.time.delay(1500)
