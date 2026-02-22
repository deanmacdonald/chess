import ChessBoard from "../components/ChessBoard.jsx";
import MoveListDialog from "../components/MoveListDialog.jsx";
import CapturedPieces from "../components/CapturedPieces.jsx";
import PlayerHeader from "../components/PlayerHeader.jsx";
import ChessClock from "../components/ChessClock.jsx";

export default function GameScreen() {
  return (
    <div className="chess-layout">
      {/* LEFT SIDE — BOARD + PLAYER HEADERS */}
      <div className="board-column">
        <PlayerHeader position="top" />
        <ChessBoard />
        <PlayerHeader position="bottom" />
      </div>

      {/* RIGHT SIDE — SIDEBAR */}
      <div className="sidebar">
        <ChessClock />
        <CapturedPieces />
        <MoveListDialog />
      </div>
    </div>
  );
}
