import json

def save_game(history, filename="game_history.json"):
    with open(filename, "w") as f:
        json.dump(history, f)

def load_game(filename="game_history.json"):
    with open(filename, "r") as f:
        return json.load(f)
