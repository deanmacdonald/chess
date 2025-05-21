def get_opening_moves(opening_name):
    openings = {
        "Ruy Lopez": ["e4", "e5", "Nf3", "Nc6", "Bb5"],
        "Sicilian Defense": ["e4", "c5"],
    }
    return openings.get(opening_name, [])
