import pygame

def get_clicked_square(pos, square_size):
    col = pos[0] // square_size
    row = pos[1] // square_size
    return row, col

