// ChessBoard.jsx
import React from "react";
import ChessSquare from "./ChessSquare";
import ChessPiece from "./ChessPiece";

const initialPosition = {
  a8: "r", b8: "n", c8: "b", d8: "q", e8: "k", f8: "b", g8: "n", h8: "r",
  a7: "p", b7: "p", c7: "p", d7: "p", e7: "p", f7: "p", g7: "p", h7: "p",
  a2: "P", b2: "P", c2: "P", d2: "P", e2: "P", f2: "P", g2: "P", h2: "P",
  a1: "R", b1: "N", c1: "B", d1: "Q", e1: "K", f1: "B", g1: "N", h1: "R",
};

function ChessBoard() {
  const files = ["a","b","c","d","e","f","g","h"];
  const ranks = [8,7,6,5,4,3,2,1];

  return (
    <div style={styles.board}>
      {ranks.map(rank =>
        files.map(file => {
          const square = file + rank;
          const piece = initialPosition[square];
          return (
            <ChessSquare key={square} square={square}>
              {piece && <ChessPiece piece={piece} />}
            </ChessSquare>
          );
        })
      )}
    </div>
  );
}

const styles = {
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(8, 60px)",
    gridTemplateRows: "repeat(8, 60px)",
    border: "4px solid #333",
    width: "480px",
    height: "480px",
  },
};

export default ChessBoard;

