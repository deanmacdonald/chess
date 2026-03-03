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

  const handleSquareClick = (from, to) => {
    engine.makeMove(from, to);
  };

  return (
    <div className="game-screen">
      <PlayerHeader />

      <ChessBoard
        board={board}
        pieces={boardUI.pieces}
        onSquareClick={handleSquareClick}
      />

      <ChessClock
        whiteTime={300}
        blackTime={300}
        currentPlayer={engine.turn}
      />

      <CapturedPieces
        whiteCaptured={[]}
        blackCaptured={[]}
      />

      <MoveListDialog moves={moveList.moves} />
    </div>
  );
}
