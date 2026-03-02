"use client";

import useGameState from "../hooks/useGameState";
import useBoardUI from "../hooks/useBoardUI";
import useMoveList from "../hooks/useMoveList";
import INITIAL_STATE from "../lib/initialState";

// UI components (now in src/)
import ChessBoard from "../ChessBoard";
import PlayerHeader from "../PlayerHeader";
import MoveListDialog from "../MoveListDialog";
import ChessClock from "../ChessClock";
import CapturedPieces from "../CapturedPieces";

export default function GameScreen() {
  const { state, makeMove } = useGameState(INITIAL_STATE);
  const boardUI = useBoardUI(state);
  const moveList = useMoveList(state);

  if (!state || !state.board) {
    return <div>Loading…</div>;
  }

  return (
    <div className="game-screen">
      <PlayerHeader />

      <ChessBoard
        board={state.board}
        pieces={boardUI.pieces}
        onMove={makeMove}
      />

      <ChessClock
        whiteTime={state.whiteTime}
        blackTime={state.blackTime}
        currentPlayer={state.currentPlayer}
      />

      <CapturedPieces
        whiteCaptured={state.whiteCaptured}
        blackCaptured={state.blackCaptured}
      />

      <MoveListDialog moves={moveList.moves} />
    </div>
  );
}
