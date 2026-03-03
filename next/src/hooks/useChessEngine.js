import { useState } from "react";
import { Chess } from "chess.js";

export default function useChessEngine() {
  const [chess] = useState(() => new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [turn, setTurn] = useState(chess.turn());
  const [legalMoves, setLegalMoves] = useState([]);

  const getBoard = () => chess.board();

  const getLegalMoves = (square) => {
    const moves = chess.moves({ square, verbose: true });
    setLegalMoves(moves.map((m) => m.to));
    return moves;
  };

  const makeMove = (from, to) => {
    const move = chess.move({ from, to, promotion: "q" });

    if (move) {
      setFen(chess.fen());
      setTurn(chess.turn());
      setLegalMoves([]);
      return true;
    }

    return false;
  };

  const reset = () => {
    chess.reset();
    setFen(chess.fen());
    setTurn(chess.turn());
    setLegalMoves([]);
  };

  return {
    fen,
    turn,
    legalMoves,
    getBoard,
    getLegalMoves,
    makeMove,
    reset,
    pgn: () => chess.pgn(),
  };
}
