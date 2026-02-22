import { useState } from "react";

export default function useMoveList() {
  const [moves, setMoves] = useState([]);

  function addMove(notation, turn) {
    setMoves((prev) => {
      const last = prev[prev.length - 1];

      if (turn === "white") {
        return [...prev, { white: notation, black: "" }];
      }

      if (turn === "black" && last) {
        const updated = [...prev];
        updated[updated.length - 1].black = notation;
        return updated;
      }

      return prev;
    });
  }

  return { moves, addMove };
}
