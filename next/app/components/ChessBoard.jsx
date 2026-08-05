"use client";

import { Chessboard } from "react-chessboard";
import { useState } from "react";
import { Chess } from "chess.js";

export default function ChessBoard() {
  const [game, setGame] = useState(new Chess());

  function onDrop(sourceSquare, targetSquare) {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;

    setGame(new Chess(game.fen()));
    return true;
  }

  return (
    <Chessboard
      position={game.fen()}
      onPieceDrop={onDrop}
    />
  );
}

