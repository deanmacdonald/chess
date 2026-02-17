"use client";

import React from "react";
import ChessBoard from "../components/ChessBoard";
import PlayerHeader from "../components/PlayerHeader";
import CapturedPieces from "../components/CapturedPieces";
import MoveListDialog from "../components/MoveListDialog";
import useGameState from "../hooks/useGameState";
import useMoveList from "../hooks/useMoveList";

export default function GameScreen() {
  const {
    board,
    selectedSquare,
    validMoves,
    moveList,
    selectSquare,
    makeMove,
  } = useGameState();

  const { moves, addMove } = useMoveList();

  const handleSquareClick = (row, col) => {
    const square = `${row}-${col}`;

    if (!selectedSquare) {
      selectSquare(row, col);
      return;
    }

    addMove({ from: selectedSquare, to: square });
    makeMove(selectedSquare, square);
    selectSquare(null);
  };

  return (
    <div className="game-screen">
      <PlayerHeader />

      <ChessBoard
        board={board}
        selectedSquare={selectedSquare}
        validMoves={validMoves}
        onSquareClick={handleSquareClick}
      />

      <CapturedPieces />
      <MoveListDialog moves={moves} />
    </div>
  );
}
