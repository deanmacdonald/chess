"use client";

import useChessEngine from "../hooks/useChessEngine";
import useBoardUI from "../hooks/useBoardUI";
import useMoveList from "../hooks/useMoveList";

// UI components
import ChessBoard from "../components/ChessBoard";
import ChessClock from "../components/ChessClock";
import PlayerHeader from "../PlayerHeader";
import MoveListDialog from "../MoveListDialog";
import CapturedPieces from "../CapturedPieces";

export default function GameScreen() {
  const engine = useChessEngine();

  const board = engine.getBoard();
  const boardUI = useBoardUI({ board });
  const moveList = useMoveList({ pgn: engine.pgn() });

  // 🔥 FIX: Normalize pieces into "row-col" keys
  const mappedPieces = {};
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece) {
        mappedPieces[`${row}-${col}`] = piece;
      }
    }
  }

  const handleSquareClick = (from, to) => {
    engine.makeMove(from, to);
  };

  return (
    <div className="game-screen">
      <PlayerHeader />

      <ChessBoard
        board={board}
        pieces={mappedPieces}   {/* ← FIXED */}
        onSquareClick={handleSquareClick}
      />

      <ChessClock
        whiteTime={300}
        blackTime={300}
        currentPlayer={engine.turn}
      />

      <CapturedPieces whiteCaptured={[]} blackCaptured={[]} />

      <MoveListDialog moves={moveList.moves} />
    </div>
  );
}
