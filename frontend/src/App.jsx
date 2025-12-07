import React, { useState } from "react";
import ChessBoard from "./components/ChessBoard.jsx";
import { initialBoard } from "./game/board.js";

export default function App() {
  const [history, setHistory] = useState([initialBoard]);
  const [currentTurn, setCurrentTurn] = useState("white");
  const [flipped, setFlipped] = useState(false);
  const [lastMove, setLastMove] = useState(null);

  const handleMove = (from, to) => {
    const board = history[history.length - 1].map(row => row.slice());
    const piece = board[from.row][from.col];

    if (!piece) return;
    if (piece.color !== currentTurn) return;

    // --- En passant detection ---
    if (
      piece.type === "pawn" &&
      Math.abs(to.col - from.col) === 1 && // diagonal move
      board[to.row][to.col] === null // target square empty
    ) {
      // White capturing en passant
      if (
        piece.color === "white" &&
        from.row === 3 &&
        lastMove &&
        lastMove.piece.type === "pawn" &&
        lastMove.piece.color === "black" &&
        lastMove.from.row === 1 &&
        lastMove.to.row === 3 &&
        lastMove.to.col === to.col
      ) {
        board[from.row][to.col] = null; // remove black pawn
      }
      // Black capturing en passant
      if (
        piece.color === "black" &&
        from.row === 4 &&
        lastMove &&
        lastMove.piece.type === "pawn" &&
        lastMove.piece.color === "white" &&
        lastMove.from.row === 6 &&
        lastMove.to.row === 4 &&
        lastMove.to.col === to.col
      ) {
        board[from.row][to.col] = null; // remove white pawn
      }
    }

    // --- Normal move ---
    board[from.row][from.col] = null;
    board[to.row][to.col] = piece;

    setHistory([...history, board]);
    setCurrentTurn(currentTurn === "white" ? "black" : "white");
    setLastMove({ from, to, piece });
  };

  return (
    <div className="app">
      <h1>React Chess</h1>
      <ChessBoard
        onMove={handleMove}
        currentTurn={currentTurn}
        flipped={flipped}
        historyState={history[history.length - 1]}
      />
      <div className="controls">
        <button onClick={() => setFlipped(!flipped)}>
          {flipped ? "Unflip Board" : "Flip Board"}
        </button>
      </div>
    </div>
  );
}
