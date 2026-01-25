// chess.js — upgraded full game hook

import { useState, useEffect } from "react";
import { Chess } from "chess.js";

const API_URL = "http://localhost:8000";

export async function makeMove(move) {
  const res = await fetch(`${API_URL}/api/move`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ move }),
  });

  if (!res.ok) throw new Error("Move request failed");
  return res.json();
}

export function useChessGame() {
  const [game] = useState(() => new Chess());
  const [position, setPosition] = useState({});
  const [selected, setSelected] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);

  // Convert FEN to piece map
  function updatePosition() {
    const map = {};
    const board = game.board();

    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        const piece = board[r][f];
        if (piece) {
          const file = "abcdefgh"[f];
          const rank = 8 - r;
          map[file + rank] = piece.color === "w"
            ? piece.type.toUpperCase()
            : piece.type.toLowerCase();
        }
      }
    }

    setPosition(map);
  }

  useEffect(() => {
    updatePosition();
  }, []);

  function handleSquareClick(square) {
    // If selecting a piece
    if (!selected) {
      const moves = game.moves({ square, verbose: true });
      if (moves.length > 0) {
        setSelected(square);
        setLegalMoves(moves.map(m => m.to));
      }
      return;
    }

    // If clicking a legal move
    if (legalMoves.includes(square)) {
      handleMove(selected, square);
      return;
    }

    // Reset selection
    setSelected(null);
    setLegalMoves([]);
  }

  async function handleMove(from, to) {
    const move = { from, to };

    const result = game.move(move);
    if (!result) return;

    updatePosition();
    setSelected(null);
    setLegalMoves([]);

    // Send to backend
    try {
      await makeMove(move);
    } catch (err) {
      console.error("Backend move failed:", err);
    }
  }

  return {
    game,
    position,
    selected,
    legalMoves,
    handleSquareClick,
    handleMove,
  };
}
