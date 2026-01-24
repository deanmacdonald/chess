import React from "react";

// Pawn
import whitePawn from "../assets/white-pawn.png";
import blackPawn from "../assets/black-pawn.png";

// Rook
import whiteRook from "../assets/white-rook.png";
import blackRook from "../assets/black-rook.png";

// Knight
import whiteKnight from "../assets/white-knight.png";
import blackKnight from "../assets/black-knight.png";

// Bishop
import whiteBishop from "../assets/white-bishop.png";
import blackBishop from "../assets/black-bishop.png";

// Queen
import whiteQueen from "../assets/white-queen.png";
import blackQueen from "../assets/black-queen.png";

// King
import whiteKing from "../assets/white-king.png";
import blackKing from "../assets/black-king.png";

function getPieceImage(piece) {
  const map = {
    // White
    P: whitePawn,
    R: whiteRook,
    N: whiteKnight,
    B: whiteBishop,
    Q: whiteQueen,
    K: whiteKing,

    // Black
    p: blackPawn,
    r: blackRook,
    n: blackKnight,
    b: blackBishop,
    q: blackQueen,
    k: blackKing,
  };

  return map[piece];
}

export default function ChessPiece({ piece, square, onDragStart, ghost }) {
  const src = getPieceImage(piece);

  return (
    <img
      src={src}
      style={{
        width: "60px",
        height: "60px",
        opacity: ghost ? 0.8 : 1,
        cursor: ghost ? "default" : "grab",
      }}
      onMouseDown={ghost ? undefined : (e) => onDragStart(piece, square, e)}
      draggable={false}
    />
  );
}

