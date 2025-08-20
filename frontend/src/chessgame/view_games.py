import sqlite3

def view_games(db_path="chess.db"):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("SELECT id, white_player, black_player, result, date_played FROM games")
    games = cursor.fetchall()
    conn.close()

    print("📋 Logged Games:")
    for game in games:
        print(f"ID: {game[0]} | {game[1]} vs {game[2]} | Result: {game[3]} | Date: {game[4]}")

if __name__ == "__main__":
    view_games()
