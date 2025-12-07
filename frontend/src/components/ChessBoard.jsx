import React from "react";
import "../styles/board.css";

export default function ChessBoard({ onMove, currentTurn, flipped, historyState }) {
  const renderBoard = () => {
    const squares = [];
    // Reverse rows/cols when flipped so black is at bottom
    const rows = flipped ? [...Array(8).keys()].reverse() : [...Array(8).keys()];
    const cols = flipped ? [...Array(8).keys()].reverse() : [...Array(8).keys()];

    for (let row of rows) {
      for (let col of cols) {
        const isLight = (row + col) % 2 === 0;
        const squareColor = isLight ? "light" : "dark";
        const piece = historyState?.[row]?.[col] || null;

        squares.push(
          <div
            key={`${row}-${col}`}
            className={`square ${squareColor}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const from = JSON.parse(e.dataTransfer.getData("from"));
              onMove(from, { row, col });
            }}
          >
            {piece && (
              <img
                src={`/assets/pieces/${piece.color}-${piece.type}.svg`}
                alt={`${piece.color} ${piece.type}`}
                className="piece"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("from", JSON.stringify({ row, col }));
                }}
              />
            )}
          </div>
        );
      }
    }
    return squares;
  };

  return (
    <div className="chess-board">
      {renderBoard()}
    </div>
  );
}
