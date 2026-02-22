"use client";

import ChessStage from "./ChessStage";

export default function Home() {
  return (
    <main
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <h1 style={{ fontSize: 32 }}>Chess Game</h1>
      <ChessStage />
    </main>
  );
}
