// Initial chess board setup

export const initialBoard = [
  // Row 0 (black major pieces)
  [
    { color: "black", type: "rook" },
    { color: "black", type: "knight" },
    { color: "black", type: "bishop" },
    { color: "black", type: "queen" },
    { color: "black", type: "king" },
    { color: "black", type: "bishop" },
    { color: "black", type: "knight" },
    { color: "black", type: "rook" },
  ],
  // Row 1 (black pawns)
  Array(8).fill({ color: "black", type: "pawn" }),
  // Rows 2–5 (empty squares)
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  // Row 6 (white pawns)
  Array(8).fill({ color: "white", type: "pawn" }),
  // Row 7 (white major pieces)
  [
    { color: "white", type: "rook" },
    { color: "white", type: "knight" },
    { color: "white", type: "bishop" },
    { color: "white", type: "queen" },
    { color: "white", type: "king" },
    { color: "white", type: "bishop" },
    { color: "white", type: "knight" },
    { color: "white", type: "rook" },
  ],
];
