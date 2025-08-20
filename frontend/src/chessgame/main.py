from chessgame.api import send_move

def handle_player_move(from_square, to_square):
    result = send_move(from_square, to_square)
    if result:
        print("Backend response:", result)
    else:
        print("Failed to reach backend.")

# Example usage
if __name__ == "__main__":
    handle_player_move("e2", "e4")
