"use client";

import React, { useCallback } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function ChessBoard({ game, setGame }) {
  const handleDrop = useCallback(
    (source, target) => {
      const next = new Chess(game.fen());
      const move = next.move({
        from: source,
        to: target,
        promotion: "q"
      });

      if (!move) return false;

      setGame(next);
      return true;
    },
    [game, setGame]
  );

  return (
    <div className="board-container tron-board">
      <Chessboard
        id="main-board"
        position={game.fen()}
        onPieceDrop={handleDrop}
        animationDuration={200}
        customBoardStyle={{
          borderRadius: "10px",
          boxShadow: "0 0 25px rgba(0,255,255,0.45)"
        }}
      />
    </div>
  );
}
