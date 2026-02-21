"use client";

import useGameState from "../hooks/useGameState";
import useBoardUI from "../hooks/useBoardUI";
import useMoveList from "../hooks/useMoveList";
import INITIAL_STATE from "../lib/initialState";

export default function GameScreen() {
  // ALL HOOKS MUST RUN FIRST
  const { state, makeMove } = useGameState(INITIAL_STATE);
  const boardUI = useBoardUI(state);
  const moveList = useMoveList(state);

  // SAFE GUARD AFTER HOOKS
  if (!state || !state.board) {
    return <div>Loading…</div>;
  }

  return (
    <div className="game-screen">
      <h1>Chess Game</h1>

      <pre>{JSON.stringify(boardUI.pieces, null, 2)}</pre>
      <pre>{JSON.stringify(moveList.moves, null, 2)}</pre>
    </div>
  );
}
