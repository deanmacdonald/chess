import sqlite3

def log_move(game_id, move_number, move_text, db_path="chess.db"):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO moves (game_id, move_number, move_text)
        VALUES (?, ?, ?)
    """, (game_id, move_number, move_text))
    conn.commit()
    conn.close()
    print(f"✅ Move {move_number} logged: {move_text}")

if __name__ == "__main__":
    log_move(1, 2, "Nf3")
