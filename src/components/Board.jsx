// src/components/Board.jsx
import { useState } from "react";
import Piece from "./Piece";
import { getBoard, move, getLegalMoves } from "../lib/chessEngine";
import { squareColor, algebraic } from "../lib/boardUtils";
import "../styles/board.css";

export default function Board() {
  const [board, setBoard] = useState(getBoard());
  const [selected, setSelected] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);

  const squareSize = 60; // adjust for mobile if needed

  function handleSquareClick(row, col) {
    const square = algebraic(row, col);

    // No square selected yet → select if legal moves exist
    if (!selected) {
      const moves = getLegalMoves(square);
      if (moves.length > 0) {
        setSelected(square);
        setLegalMoves(moves.map(m => m.to));
      }
      return;
    }

    // A square is selected → try to move
    const result = move(selected, square);

    // Clear selection
    setSelected(null);
    setLegalMoves([]);

    // If move was legal, update board
    if (result) {
      setBoard(getBoard());
    }
  }

  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(8, ${squareSize}px)`,
        gridTemplateRows: `repeat(8, ${squareSize}px)`
      }}
    >
      {board.map((rowArr, row) =>
        rowArr.map((pieceObj, col) => {
          const square = algebraic(row, col);
          const isHighlight = legalMoves.includes(square);

          return (
            <div
              key={square}
              className={`square ${squareColor(row, col)} ${
                isHighlight ? "highlight" : ""
              }`}
              style={{ width: squareSize, height: squareSize }}
              onClick={() => handleSquareClick(row, col)}
            >
              <Piece
                piece={
                  pieceObj ? pieceObj.color + pieceObj.type : null
                }
                squareSize={squareSize}
              />
            </div>
          );
        })
      )}
    </div>
  );
}
