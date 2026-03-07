import { useState, useCallback } from "react";
import { Chess } from "chess.js";

// Deep clone board so React re-renders properly
const cloneBoard = (g) => JSON.parse(JSON.stringify(g.board()));

// Find king square for check highlighting
const findKingSquare = (g, color) => {
  const files = "abcdefgh";
  const board = g.board();
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece.type === "k" && piece.color === color) {
        const file = files[c];
        const rank = 8 - r;
        return file + rank;
      }
    }
  }
  return null;
};

export function useChessEngine() {
  const [game, setGame] = useState(() => new Chess());
  const [board, setBoard] = useState(() => cloneBoard(new Chess()));
  const [status, setStatus] = useState("White to move");
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [lastMove, setLastMove] = useState(null);
  const [inCheckSquare, setInCheckSquare] = useState(null);

  const refreshState = useCallback((g, lastMoveArg = null) => {
    setBoard(cloneBoard(g));

    // Status text
    if (g.isCheckmate()) {
      setStatus(g.turn() === "w" ? "Black wins by checkmate" : "White wins by checkmate");
    } else if (g.isDraw()) {
      setStatus("Draw");
    } else {
      const turnText = g.turn() === "w" ? "White to move" : "Black to move";
      setStatus(turnText + (g.isCheck() ? " (in check)" : ""));
    }

    // Highlight king in check
    if (g.isCheck()) {
      const kingSq = findKingSquare(g, g.turn());
      setInCheckSquare(kingSq);
    } else {
      setInCheckSquare(null);
    }

    // Highlight last move
    if (lastMoveArg) {
      setLastMove(lastMoveArg);
    }
  }, []);

  const resetGame = useCallback(() => {
    const g = new Chess();
    setGame(g);
    setSelectedSquare(null);
    setLegalMoves([]);
    setLastMove(null);
    setInCheckSquare(null);
    refreshState(g);
  }, [refreshState]);

  const handleSquareClick = useCallback(
    (square) => {
      // No piece selected yet → try selecting one
      if (!selectedSquare) {
        const moves = game.moves({ square, verbose: true });
        if (moves.length === 0) return;
        setSelectedSquare(square);
        setLegalMoves(moves.map((m) => m.to));
        return;
      }

      // Clicking same square → unselect
      if (square === selectedSquare) {
        setSelectedSquare(null);
        setLegalMoves([]);
        return;
      }

      // Attempt move
      const move = game.move({
        from: selectedSquare,
        to: square,
        promotion: "q", // auto-queen
      });

      if (move) {
        const newGame = new Chess(game.fen());
        setGame(newGame);
        setSelectedSquare(null);
        setLegalMoves([]);

        refreshState(newGame, { from: move.from, to: move.to });
        return;
      }

      // Move failed → maybe selecting a different piece
      const moves = game.moves({ square, verbose: true });
      if (moves.length > 0) {
        setSelectedSquare(square);
        setLegalMoves(moves.map((m) => m.to));
      } else {
        setSelectedSquare(null);
        setLegalMoves([]);
      }
    },
    [game, selectedSquare, refreshState],
  );

  return {
    board,
    status,
    selectedSquare,
    legalMoves,
    lastMove,
    inCheckSquare,
    handleSquareClick,
    resetGame,
  };
}
