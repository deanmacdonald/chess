import pygame
import logging

class InputHandler:
    def __init__(self, renderer, board):
        self.renderer = renderer
        self.board = board
        self.selected_piece = None
        self.selected_pos = None
        self.legal_moves = []

    def handle_event(self, event):
        if event.type == pygame.QUIT:
            logging.info("Quitting game.")
            pygame.quit()
            exit()

        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                logging.info("Selection cleared with ESC.")
                self.clear_selection()

        elif event.type == pygame.MOUSEBUTTONDOWN:
            self.select_piece(event)

        elif event.type == pygame.MOUSEBUTTONUP:
            self.try_move(event)

    def select_piece(self, event):
        x, y = pygame.mouse.get_pos()
        col, row = x // self.renderer.tile_size, y // self.renderer.tile_size
        piece = self.board.get_piece(row, col)
        if piece:
            logging.info(f"Selected {piece.color} {piece.name} at ({row}, {col})")
            self.selected_piece = piece
            self.selected_pos = (row, col)
            try:
                self.legal_moves = piece.get_legal_moves(self.board, self.selected_pos)
            except AttributeError:
                logging.warning(f"{piece.name} does not implement get_legal_moves.")
                self.legal_moves = []
        else:
            logging.info(f"No piece at ({row}, {col})")
            self.clear_selection()

    def try_move(self, event):
        if not self.selected_piece:
            return

        x, y = pygame.mouse.get_pos()
        new_col, new_row = x // self.renderer.tile_size, y // self.renderer.tile_size
        if (new_row, new_col) in self.legal_moves:
            old_row, old_col = self.selected_pos

            # Animate the move
            self.renderer.animate_move(self.selected_piece, self.selected_pos, (new_row, new_col))

            # Update board state
            self.board.set_piece(new_row, new_col, self.selected_piece)
            self.board.set_piece(old_row, old_col, None)
            self.selected_piece.position = (new_row, new_col)
        else:
            logging.info(f"Illegal move attempted to ({new_row}, {new_col})")

        self.clear_selection()

    def clear_selection(self):
        self.selected_piece = None
        self.selected_pos = None
        self.legal_moves = []

