"use client";

import React, { useState } from "react";
import { Chess } from "chess.js";
import ChessBoard from "./ChessBoard";

export default function Home() {
  const [game, setGame] = useState(new Chess());

  return (
    <main className="app-wrapper">
      <h1 className="title">Black Knight Chess</h1>
      <ChessBoard game={game} setGame={setGame} />
    </main>
  );
}
