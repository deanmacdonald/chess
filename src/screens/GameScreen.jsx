import ChessBoard from "../components/ChessBoard.jsx";
import MoveListDialog from "../components/MoveListDialog.jsx";
import CapturedPieces from "../components/CapturedPieces.jsx";
import PlayerHeader from "../components/PlayerHeader.jsx";
import ChessClock from "../components/ChessClock.jsx";

export default function GameScreen() {
  return (
    <div className="chess-layout">
      <div className="board-column">
        <PlayerHeader position="top" />
        <ChessBoard />
        <PlayerHeader position="bottom" />
      </div>

      <div className="sidebar">
        <ChessClock />

        {/* Always pass arrays so CapturedPieces never receives undefined */}
        <CapturedPieces pieces={[]} />
        <CapturedPieces pieces={[]} />

        <MoveListDialog />
      </div>
    </div>
  );
}
