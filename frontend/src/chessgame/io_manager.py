import os
import json
from typing import Any, Dict, Optional

class IOManager:
    DEFAULT_SAVE_PATH = "assets/saves/game_state.json"

    @staticmethod
    def save_game(board_state: Any, turn: str, path: str = None) -> None:
        """Save game state to a JSON file."""
        save_path = path or IOManager.DEFAULT_SAVE_PATH
        data = {"board": board_state, "turn": turn}

        try:
            os.makedirs(os.path.dirname(save_path), exist_ok=True)
            with open(save_path, "w", encoding="utf-8") as file:
                json.dump(data, file, indent=2)
            print(f"[✔] Game saved to '{save_path}'.")
        except (IOError, TypeError) as e:
            print(f"[✘] Failed to save game: {e}")

    @staticmethod
    def load_game(path: str = None) -> Optional[Dict[str, Any]]:
        """Load game state from a JSON file."""
        load_path = path or IOManager.DEFAULT_SAVE_PATH

        if not os.path.exists(load_path):
            print(f"[!] No save file found at '{load_path}'. Starting new game.")
            return None

        try:
            with open(load_path, "r", encoding="utf-8") as file:
                return json.load(file)
        except json.JSONDecodeError:
            print(f"[!] Save file at '{load_path}' is corrupted. Starting fresh.")
        except IOError as e:
            print(f"[✘] Failed to load game: {e}")

        return None
