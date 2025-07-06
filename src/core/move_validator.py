import os
import json
from typing import Any, Dict, Optional, Callable

class IOManager:
    DEFAULT_SAVE_PATH = "assets/saves/game_state.json"

    @staticmethod
    def save_game(
        board_state: Any,
        turn: str,
        path: Optional[str] = None,
        serializer: Optional[Callable[[Any], Any]] = None,
        backup: bool = True
    ) -> None:
        """
        Save game state to a JSON file.

        Args:
            board_state: The current board state (must be JSON-serializable or use `serializer`).
            turn: Whose turn it is.
            path: Optional custom save path.
            serializer: Optional function to convert board_state to a serializable format.
            backup: Whether to create a backup of the previous save.
        """
        save_path = path or IOManager.DEFAULT_SAVE_PATH
        os.makedirs(os.path.dirname(save_path), exist_ok=True)

        if backup and os.path.exists(save_path):
            try:
                os.replace(save_path, save_path + ".bak")
                print(f"[↩] Backup created at '{save_path}.bak'")
            except OSError as e:
                print(f"[!] Failed to create backup: {e}")

        data = {
            "board": serializer(board_state) if serializer else board_state,
            "turn": turn
        }

        try:
            with open(save_path, "w", encoding="utf-8") as file:
                json.dump(data, file, indent=2)
            print(f"[✔] Game saved to '{save_path}'.")
        except (IOError, TypeError) as e:
            print(f"[✘] Failed to save game: {e}")

    @staticmethod
    def load_game(path: Optional[str] = None) -> Optional[Dict[str, Any]]:
        """
        Load game state from a JSON file.

        Args:
            path: Optional custom load path.

        Returns:
            A dictionary with keys 'board' and 'turn', or None if loading fails.
        """
        load_path = path or IOManager.DEFAULT_SAVE_PATH

        if not os.path.exists(load_path):
            print(f"[!] No save file found at '{load_path}'. Starting new game.")
            return None

        try:
            with open(load_path, "r", encoding="utf-8") as file:
                data = json.load(file)
                print(f"[✔] Game loaded from '{load_path}'.")
                return data
        except json.JSONDecodeError:
            print(f"[!] Save file at '{load_path}' is corrupted. Starting fresh.")
        except IOError as e:
            print(f"[✘] Failed to load game: {e}")

        return None
