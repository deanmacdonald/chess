import React from "react";
import ChessBoard from "../components/ChessBoard";
import useBoardUI from "../hooks/useBoardUI";
import useChessEngine from "../hooks/useChessEngine";
import useMoveList from "../hooks/useMoveList";
import PlayerHeader from "../PlayerHeader";
import MoveListDialog from "../MoveListDialog";

export default function GameScreen() {
  const { board, mappedPieces, selectedSquare, selectSquare } = useBoardUI();
  const { makeMove, legalMoves } = useChessEngine();
  const { moves } = useMoveList();

  function handleSquareClick(square) {
    if (!selectedSquare) {
      selectSquare(square);
      return;
    }

    makeMove(square);
  }

  return (
    <div className="game-screen">
      <div className="player-section top-player">
        <PlayerHeader player="Black" />
      </div>

      <div className="board-container">
        <ChessBoard
          board={board}
          pieces={mappedPieces}
          selectedSquare={selectedSquare}
          onSquareClick={handleSquareClick}
          legalMoves={legalMoves}
        />
      </div>

      <div className="player-section bottom-player">
        <PlayerHeader player="White" />
      </div>

      <MoveListDialog moves={moves} />
    </div>
  );
}
