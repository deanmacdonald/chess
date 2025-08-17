# pieces.py

# Define standard starting piece layout for a chess game

def create_starting_pieces():
    pieces = []

    # Add pawns
    for col in range(8):
        pieces.append({"type": "pawn", "color": "white", "pos": [col, 6]})
        pieces.append({"type": "pawn", "color": "black", "pos": [col, 1]})

    # Add major pieces in correct order
    placement = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]
    for col, name in enumerate(placement):
        pieces.append({"type": name, "color": "white", "pos": [col, 7]})
        pieces.append({"type": name, "color": "black", "pos": [col, 0]})

    return pieces
