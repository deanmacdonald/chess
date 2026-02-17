"use client";

import React from "react";

export default function ChessPiece({ piece }) {
  if (!piece) return null;

  // Map letters to Unicode chess symbols
  const pieceMap = {
    r: "♜",
    n: "♞",
    b: "♝",
    q: "♛",
    k: "♚",
    p: "♟",
    R: "♖",
    N: "♘",
    B: "♗",
    Q: "♕",
    K: "♔",
    P: "♙",
  };

  return (
    <span className="chess-piece">
      {pieceMap[piece]}
    </span>
  );
}
