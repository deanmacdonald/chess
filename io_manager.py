import os
import json

class IOManager:
    SAVE_PATH = "assets/saves/game_state.json"  # Updated location

    @staticmethod
    def save_game(board_state, turn):
        """Save game state to a file."""
        data = {"board": board_state, "turn": turn}
        try:
            with open(IOManager.SAVE_PATH, "w") as file:
                json.dump(data, file)
            print("✅ Game saved successfully.")
        except IOError:
            print("⚠️ Error: Unable to save the game state.")

    @staticmethod
    def load_game():
        """Load game state from a file."""
        if os.path.exists(IOManager.SAVE_PATH):
            try:
                with open(IOManager.SAVE_PATH, "r") as file:
                    return json.load(file)
            except json.JSONDecodeError:
                print("⚠️ Error: Corrupt game save file. Starting fresh.")
                return None
        return None  # Return None if the save file doesn't exist
