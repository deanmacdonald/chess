// ChessBoard.jsx
import React, { useState, useRef, useEffect } from "react";
import ChessSquare from "./ChessSquare";
import ChessPiece from "./ChessPiece";

const initialPosition = {
  a8: "r", b8: "n", c8: "b", d8: "q", e8: "k", f8: "b", g8: "n", h8: "r",
  a7: "p", b7: "p", c7: "p", d7: "p", e7: "p", f7: "p", g7: "p", h7: "p",
  a2: "P", b2: "P", c2: "P", d2: "P", e2: "P", f2: "P", g2: "P", h2: "P",
  a1: "R", b1: "N", c1: "B", d1: "Q", e1: "K", f1: "B", g1: "N", h1: "R",
};

function ChessBoard() {
  const [position, setPosition] = useState(initialPosition);

  const [dragging, setDragging] = useState(null); 
  // { piece, fromSquare }

  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const boardRef = useRef(null);

  const files = ["a","b","c","d","e","f","g","h"];
  const ranks = [8,7,6,5,4,3,2,1];

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

  function dropPiece(toSquare) {
    if (!dragging || !toSquare) return;

    setPosition(prev => {
      const newPos = { ...prev };
      delete newPos[dragging.fromSquare];
      newPos[toSquare] = dragging.piece;
      return newPos;
    });
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
      {ranks.map(rank =>
        files.map(file => {
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

