# test_pygame.py
import pygame
pygame.init()
screen = pygame.display.set_mode((400, 300))
pygame.display.set_caption("Chess Boot Check")
screen.fill((60, 60, 60))
pygame.display.flip()
pygame.time.wait(2000)
pygame.quit()
