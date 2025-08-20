import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent.parent / "chess.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS moves (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        game_id INTEGER,
        move_number INTEGER,
        player TEXT,
        move TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    """)
    conn.commit()
    conn.close()

def add_move(game_id, move_number, player, move):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO moves (game_id, move_number, player, move)
    VALUES (?, ?, ?, ?)
    """, (game_id, move_number, player, move))
    conn.commit()
    conn.close()
