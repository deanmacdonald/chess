import os
import pygame
from dotenv import load_dotenv
from board import ChessBoard, load_piece_images, WIDTH, HEIGHT

# Load environment variables (if needed)
load_dotenv()
print(f"Runtime dir: {os.getenv('XDG_RUNTIME_DIR')}")

# Initialize Pygame
pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Dean's Pro Chess Board")

# Load piece images
load_piece_images()

# Initialize board object
chess_board = ChessBoard()

# --- Game Loop ---
def main():
    clock = pygame.time.Clock()
    running = True

    while running:
        screen.fill((0, 0, 0))  # Optional full-screen background

        # Draw updated board and coordinates
        chess_board.draw(screen)

        pygame.display.flip()
        clock.tick(60)  # Limit to 60 FPS

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

            # Press SPACE to activate basic AI move
            elif event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
                ai_move()

    pygame.quit()

# --- Dummy AI ---
def ai_move():
    # Move first white piece with a valid move (for now)
    for pos, piece in chess_board.pieces.items():
        if piece.color == "white":
            valid_moves = piece.get_valid_moves(chess_board)
            if valid_moves:
                print(f"AI moving {piece.piece_type} from {pos} to {valid_moves[0]}")
                piece.move(valid_moves[0])
                break

if __name__ == "__main__":
    main()

