"use client";

import { useState } from "react";

const PIECES = {
  wK: "♔", wQ: "♕", wR: "♖", wB: "♗", wN: "♘", wP: "♙",
  bK: "♚", bQ: "♛", bR: "♜", bB: "♝", bN: "♞", bP: "♟",
};

export default function ChessBoard({ board, onMove }) {
  const [dragFrom, setDragFrom] = useState(null);

  function handleDown(square) {
    setDragFrom(square);
  }

  function handleUp(square) {
    if (dragFrom && dragFrom !== square) {
      onMove(dragFrom, square);
    }
    setDragFrom(null);
  }

  return (
    <div style={{ display: "inline-block", border: "2px solid #000" }}>
      {board.map((row, rIndex) => (
        <div key={rIndex} style={{ display: "flex" }}>
          {row.map((cell, cIndex) => {
            const square =
              "abcdefgh"[cIndex] + (8 - rIndex);

            const piece = cell ? PIECES[cell.color + cell.type.toUpperCase()] : "";

            return (
              <div
                key={square}
                onMouseDown={() => handleDown(square)}
                onMouseUp={() => handleUp(square)}
                onTouchStart={() => handleDown(square)}
                onTouchEnd={() => handleUp(square)}
                style={{
                  width: 45,
                  height: 45,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    (rIndex + cIndex) % 2 === 0 ? "#eee" : "#444",
                  color:
                    (rIndex + cIndex) % 2 === 0 ? "#000" : "#fff",
                  fontSize: 28,
                  userSelect: "none",
                }}
              >
                {piece}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
