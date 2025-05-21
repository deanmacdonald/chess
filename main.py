import game

def main():
    try:
        game.main()
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
