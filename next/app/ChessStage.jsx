"use client";

import React from "react";
import ChessBoard from "./ChessBoard";

export default function ChessStage() {
  return (
    <section className="stage-wrapper">
      <div className="stage-title mb-4">
        <h2 className="text-xl font-semibold text-cyan-300 drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
          Game Stage
        </h2>
      </div>

      <div className="stage-board">
        <ChessBoard />
      </div>
    </section>
  );
}
