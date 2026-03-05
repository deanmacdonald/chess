import React from "react";
import ChessBoard from "../components/ChessBoard";
import { useChessEngine } from "../hooks/useChessEngine";

export default function GameScreen() {
  const {
    board,
    status,
    selectedSquare,
    legalMoves,
    handleSquareClick,
    resetGame,
  } = useChessEngine();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at center, #00111f 0%, #00040a 100%)",
        color: "#0ff",
        textShadow: "0 0 8px #0ff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "42px", margin: 0, textShadow: "0 0 12px #0ff" }}>
        TRON Chess
      </h1>

      <p style={{ fontSize: "20px", margin: 0 }}>{status}</p>

      <ChessBoard
        board={board}
        selectedSquare={selectedSquare}
        legalMoves={legalMoves}
        onSquareClick={handleSquareClick}
      />

      <button
        onClick={resetGame}
        style={{
          marginTop: "20px",
          padding: "10px 22px",
          background: "#00eaff",
          border: "2px solid #0ff",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "18px",
          color: "#00111f",
          textShadow: "none",
          boxShadow: "0 0 12px #0ff, inset 0 0 8px #0ff",
          transition: "0.2s ease",
        }}
      >
        New Game
      </button>
    </div>
  );
}
