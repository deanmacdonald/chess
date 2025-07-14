import sqlite3

def init_db():
    conn = sqlite3.connect("chess.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            player_white TEXT,
            player_black TEXT,
            result TEXT,
            moves TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

def record_game(player_white, player_black, result, moves):
    conn = sqlite3.connect("chess.db")
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO games (player_white, player_black, result, moves)
        VALUES (?, ?, ?, ?)
    """, (player_white, player_black, result, ",".join(moves)))
    conn.commit()
    conn.close()

