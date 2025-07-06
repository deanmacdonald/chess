import game
import traceback

def main():
    try:
        if hasattr(game, "main") and callable(game.main):
            print("Launching Chess Game...")
            game.main()
        else:
            raise AttributeError("The 'game' module does not have a callable 'main()' function.")
    except Exception:
        print("An unexpected error occurred while running the game:")
        traceback.print_exc()

if __name__ == "__main__":
    main()

