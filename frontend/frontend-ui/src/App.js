import React, { useState } from "react";
import { Chess } from "chess.js";
import "./App.css";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

const pieceUnicode = {
  w: {
    p: "♙", r: "♖", n: "♘", b: "♗", q: "♕", k: "♔"
  },
  b: {
    p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚"
  }
};

function App() {
  const [game, setGame] = useState(new Chess());
  const [selected, setSelected] = useState(null);

  const handleClick = (file, rank) => {
    const position = `${file}${rank}`;
    const piece = game.get(position);

    if (selected) {
      const move = game.move({ from: selected, to: position, promotion: "q" });
      if (move) {
        setGame(new Chess(game.fen()));
      }
      setSelected(null);
    } else if (piece && piece.color === game.turn()) {
      setSelected(position);
    }
  };

  const renderSquare = (file, rank) => {
    const position = `${file}${rank}`;
    const piece = game.get(position);
    const isSelected = selected === position;
    const isDark = (files.indexOf(file) + ranks.indexOf(rank)) % 2 === 1;

    return (
      <div
        key={position}
        className={`square ${isDark ? "dark" : "light"} ${isSelected ? "selected" : ""}`}
        onClick={() => handleClick(file, rank)}
      >
        {piece ? pieceUnicode[piece.color][piece.type] : ""}
      </div>
    );
  };

  return (
    <>
      <p className="turn-indicator">Turn: {game.turn() === "w" ? "White" : "Black"}</p>
      <div className="board">
        {ranks.map(rank =>
          files.map(file => renderSquare(file, rank))
        )}
      </div>
    </>
  );
}

export default App;
