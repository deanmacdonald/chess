"use client";

import React from "react";
import ChessBoard from "./ChessBoard";

export default function ChessStage({ game, setGame }) {
  return (
    <section className="stage-wrapper">
      <div className="stage-title">
        <h2>Game Stage</h2>
      </div>

      <div className="stage-board">
        <ChessBoard game={game} setGame={setGame} />
      </div>
    </section>
  );
}
