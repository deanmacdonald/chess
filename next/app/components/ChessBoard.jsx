"use client";

import React, { useRef } from "react";
import ChessPiece from "./ChessPiece";
import "./ChessBoard.css";

export default function ChessBoard({
  board,
  onSquareClick,
  selectedSquare,
  validMoves,
}) {
  const boardRef = useRef(null);

  return (
    <div className="chessboard" ref={boardRef}>
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const square = `${rowIndex}-${colIndex}`;
          const isSelected = selectedSquare === square;
          const isValidMove = validMoves.includes(square);

          return (
            <div
              key={square}
              className={`square ${isSelected ? "selected" : ""} ${
                isValidMove ? "valid-move" : ""
              }`}
              onClick={() => onSquareClick(rowIndex, colIndex)}
            >
              {piece && (
                <ChessPiece piece={piece} position={{ rowIndex, colIndex }} />
              )}
            </div>
          );
        }),
      )}
    </div>
  );
}
