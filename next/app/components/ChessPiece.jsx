"use client";

import React from "react";

export default function ChessPiece({ piece, square }) {
  return (
    <div className="chess-piece">
      <span className="piece-label">{piece}</span>
      <span className="square-label">{square}</span>
    </div>
  );
}
