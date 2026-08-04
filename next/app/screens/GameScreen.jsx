"use client";

import React from "react";
import ChessStage from "../ChessStage";

export default function GameScreen({ game, setGame }) {
  return (
    <div className="game-screen">
      <h1 className="tron-accent">Game Screen</h1>
      <ChessStage game={game} setGame={setGame} />
    </div>
  );
}
