// ChessBoard.jsx
import React, { useState, useRef, useEffect } from "react";
import ChessSquare from "./ChessSquare";
import ChessPiece from "./ChessPiece";
import { game } from "../chessEngine";   // <-- chess.js engine

// Convert chess.js board() → your { square: piece } format
function convertBoardToPosition(board) {
  const pos = {};
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const square = board[r][c];
      if (square) {
        const file = "abcdefgh"[c];
        const rank = 8 - r;
        pos[file + rank] =
          square.color === "w"
            ? square.type.toUpperCase()
            : square.type.toLowerCase();
      }
    }
  }
  return pos;
}

function ChessBoard() {
  const [position, setPosition] = useState(
    convertBoardToPosition(game.board())
  );

  const [dragging, setDragging] = useState(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const boardRef = useRef(null);

  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

  function startDrag(piece, fromSquare, e) {
    e.preventDefault();
    setDragging({ piece, fromSquare });
    setDragPos({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  }

  function getSquareFromCoords(x, y) {
    const rect = boardRef.current.getBoundingClientRect();
    const file = Math.floor(((x - rect.left) / rect.width) * 8);
    const rank = 7 - Math.floor(((y - rect.top) / rect.height) * 8);
    if (file < 0 || file > 7 || rank < 0 || rank > 7) return null;
    return `${"abcdefgh"[file]}${rank + 1}`;
  }

  // 🔥 NEW: rules‑checked drop using chess.js
  function dropPiece(toSquare) {
    if (!dragging || !toSquare) return;

    const from = dragging.fromSquare;
    const to = toSquare;

    const result = game.move({ from, to });

    if (!result) {
      console.log("Illegal move:", from, "→", to);
      return;
    }

    // Update UI from chess.js board state
    setPosition(convertBoardToPosition(game.board()));
  }

  useEffect(() => {
    function handleMove(e) {
      if (!isDragging) return;
      setDragPos({ x: e.clientX, y: e.clientY });
    }

    function handleUp(e) {
      if (!isDragging) return;

      const target = getSquareFromCoords(e.clientX, e.clientY);
      dropPiece(target);

      setDragging(null);
      setIsDragging(false);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isDragging, dragging]);

  return (
    <div ref={boardRef} style={styles.board}>
      {ranks.map((rank) =>
        files.map((file) => {
          const square = file + rank;
          const piece = position[square];
          return (
            <ChessSquare key={square} square={square}>
              {piece && (
                <ChessPiece
                  piece={piece}
                  square={square}
                  onDragStart={startDrag}
                />
              )}
            </ChessSquare>
          );
        })
      )}

      {isDragging && dragging && (
        <div
          style={{
            position: "fixed",
            left: dragPos.x - 30,
            top: dragPos.y - 30,
            pointerEvents: "none",
            zIndex: 999,
          }}
        >
          <ChessPiece piece={dragging.piece} ghost />
        </div>
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
    position: "relative",
  },
};

export default ChessBoard;

