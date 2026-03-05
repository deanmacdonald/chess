import { useState, useCallback } from "react";
import { Chess } from "chess.js";

export function useChessEngine() {
  const [game, setGame] = useState(() => new Chess());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [board, setBoard] = useState(game.board());
  const [turn, setTurn] = useState(game.turn());
  const [status, setStatus] = useState("White to move");

  const refreshState = useCallback((g) => {
    setBoard(g.board());
    setTurn(g.turn());

    if (g.isCheckmate()) {
      setStatus(
        g.turn() === "w"
          ? "Black wins by checkmate"
          : "White wins by checkmate",
      );
    } else if (g.isDraw()) {
      setStatus("Draw");
    } else {
      setStatus(g.turn() === "w" ? "White to move" : "Black to move");
    }
  }, []);

  const resetGame = useCallback(() => {
    const g = new Chess();
    setGame(g);
    setSelectedSquare(null);
    setLegalMoves([]);
    refreshState(g);
  }, [refreshState]);

  const handleSquareClick = useCallback(
    (square) => {
      if (!selectedSquare) {
        const moves = game.moves({ square, verbose: true });
        if (moves.length === 0) return;
        setSelectedSquare(square);
        setLegalMoves(moves.map((m) => m.to));
        return;
      }

      if (square === selectedSquare) {
        setSelectedSquare(null);
        setLegalMoves([]);
        return;
      }

      const move = game.move({
        from: selectedSquare,
        to: square,
        promotion: "q",
      });

      if (move) {
        const newGame = new Chess(game.fen());
        setGame(newGame);
        setSelectedSquare(null);
        setLegalMoves([]);
        refreshState(newGame);
      } else {
        const moves = game.moves({ square, verbose: true });
        if (moves.length > 0) {
          setSelectedSquare(square);
          setLegalMoves(moves.map((m) => m.to));
        } else {
          setSelectedSquare(null);
          setLegalMoves([]);
        }
      }
    },
    [game, selectedSquare, refreshState],
  );

  return {
    board,
    turn,
    status,
    selectedSquare,
    legalMoves,
    handleSquareClick,
    resetGame,
  };
}
