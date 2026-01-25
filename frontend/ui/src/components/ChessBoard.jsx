// ChessBoard.jsx
import React from "react";
import { useChessGame } from "../api/chess";
import ChessSquare from "./ChessSquare";
import ChessPiece from "./ChessPiece";
import { game } from "../chessEngine";   // <-- chess.js engine

<<<<<<< Updated upstream
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
=======
const files = ["a","b","c","d","e","f","g","h"];
const ranks = [8,7,6,5,4,3,2,1];

export default function ChessBoard() {
  const {
    game,
    position,
    selected,
    legalMoves,
    handleSquareClick,
    handleMove,
  } = useChessGame();

  function onDragStart(piece, fromSquare) {
    handleSquareClick(fromSquare);
>>>>>>> Stashed changes
  }

  function onDrop(from, to) {
    handleMove(from, to);
  }

<<<<<<< Updated upstream
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
=======
  return (
    <div style={styles.board}>
      {ranks.map(rank =>
        files.map(file => {
>>>>>>> Stashed changes
          const square = file + rank;
          const piece = position[square];
          const isSelected = selected === square;
          const isLegal = legalMoves.includes(square);

          return (
            <ChessSquare
              key={square}
              square={square}
              selected={isSelected}
              legal={isLegal}
              onClick={() => handleSquareClick(square)}
            >
              {piece && (
                <ChessPiece
                  piece={piece}
                  square={square}
                  onDragStart={onDragStart}
                  onDrop={onDrop}
                />
              )}
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
    gridTemplateColumns: "repeat(8, 1fr)",
    gridTemplateRows: "repeat(8, 1fr)",
    width: "100%",
    maxWidth: "480px",
    aspectRatio: "1 / 1",
    border: "4px solid #333",
    margin: "0 auto",
    position: "relative",
  },
};
