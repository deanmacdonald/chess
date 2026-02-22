"use client";

import { useState } from "react";
import { Chess } from "chess.js";
import ChessBoard from "./ChessBoard";

export default function ChessStage() {
  const [game] = useState(() => new Chess());
  const [board, setBoard] = useState(game.board());

  function onMove(from, to) {
    const move = game.move({ from, to });

    if (move) {
      setBoard(game.board());
    }
  }

  return (
    <ChessBoard board={board} onMove={onMove} />
  );
}
