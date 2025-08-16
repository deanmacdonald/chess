import sqlite3

conn = sqlite3.connect("chess.db")
cursor = conn.cursor()

# Example move
cursor.execute("""
INSERT INTO moves (game_id, move_number, player, move)
VALUES (?, ?, ?, ?)
""", (1, 1, 'white', 'e4'))

conn.commit()
conn.close()
