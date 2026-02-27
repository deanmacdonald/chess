import { useState, useRef, useCallback } from "react";
import { Chess } from "chess.js";

export default function useGameState() {
  // Keep a single Chess instance for the entire game
  const chess = useRef(new Chess());

  // React state mirrors the chess engine state
  const [board, setBoard] = useState(chess.current.board());
  const [turn, setTurn] = useState(chess.current.turn());
  const [moveHistory, setMoveHistory] = useState([]);
  const [legalMoves, setLegalMoves] = useState([]);
  const [lastMove, setLastMove] = useState(null);

  // Sync React state with the chess engine
  const updateBoardState = useCallback(() => {
    setBoard(chess.current.board());
    setTurn(chess.current.turn());
    setMoveHistory(chess.current.history({ verbose: true }));
    setLegalMoves(chess.current.moves({ verbose: true }));
  }, []);

  // When dragging starts, highlight legal moves for that square
  const handleDragStart = useCallback((from) => {
    const moves = chess.current.moves({ square: from, verbose: true });
    setLegalMoves(moves);
  }, []);

  // When dragging ends, attempt the move
  const handleDragEnd = useCallback((from, to) => {
    console.log("DragEnd:", { from, to });

    if (!to || from === to) {
      console.warn("Invalid drop:", { from, to });
      return;
    }

    try {
      const move = chess.current.move({ from, to, promotion: "q" });

      if (!move) {
        console.warn("Illegal move:", { from, to });
        return;
      }

      setLastMove({ from, to });
      updateBoardState();
    } catch (err) {
      console.error("Move error:", err);
    }
  }, [updateBoardState]);

  return {
    board,
    turn,
    moveHistory,
    legalMoves,
    lastMove,
    handleDragStart,
    handleDragEnd,
  };
}

