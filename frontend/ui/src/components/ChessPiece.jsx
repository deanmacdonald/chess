// ChessPiece.jsx
import React from "react";

const unicodePieces = {
  K: "♔", Q: "♕", R: "♖", B: "♗", N: "♘", P: "♙",
  k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟",
};

function ChessPiece({ piece }) {
  return (
    <span style={{ fontSize: "48px" }}>
      {unicodePieces[piece]}
    </span>
  );
}

export default ChessPiece;

