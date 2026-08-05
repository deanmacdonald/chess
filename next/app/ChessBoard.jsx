"use client";

import { Chessboard } from "react-chessboard";
import { useGameState } from "./context/GameStateProvider";

export default function ChessBoard() {
  const { game, makeMove } = useGameState();

  const handleDrop = (source, target) => {
    return makeMove({
      from: source,
      to: target,
      promotion: "q",
    });
  };

  return (
    <div className="board-container tron-board">
      <Chessboard
        id="main-board"
        position={game.fen()}
        onPieceDrop={handleDrop}
        animationDuration={200}
        customBoardStyle={{
          borderRadius: "10px",
          boxShadow: "0 0 25px rgba(0,255,255,0.45)",
        }}
      />
    </div>
  );
}
