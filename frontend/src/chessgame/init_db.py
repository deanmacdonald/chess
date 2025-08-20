import sqlite3

def initialize_database(db_path="chess.db"):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Create moves table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS moves (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        game_id INTEGER,
        move_number INTEGER,
        move_text TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (game_id) REFERENCES games(id)
    )
    """)

    # Create games table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        white_player TEXT,
        black_player TEXT,
        result TEXT,
        date_played DATE DEFAULT CURRENT_DATE
    )
    """)

    conn.commit()
    conn.close()
    print("✅ Database initialized with game tracking.")

if __name__ == "__main__":
    initialize_database()
