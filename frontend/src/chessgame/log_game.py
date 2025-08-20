import sqlite3

def log_game(white_player, black_player, result, db_path="chess.db"):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO games (white_player, black_player, result)
        VALUES (?, ?, ?)
    """, (white_player, black_player, result))

    conn.commit()
    game_id = cursor.lastrowid
    conn.close()

    print(f"✅ Game logged: {white_player} vs {black_player} — Result: {result}")
    print(f"🆔 Game ID: {game_id}")
    return game_id

if __name__ == "__main__":
    # Example usage
    white = input("Enter White player's name: ")
    black = input("Enter Black player's name: ")
    result = input("Enter result (e.g., 1-0, 0-1, ½-½): ")

    log_game(white, black, result)
