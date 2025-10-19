import { useState } from "react";
import { Chess } from "chess.js";

export const useChessGame = () => {
    const [game, setGame] = useState(new Chess());
    const [selected, setSelected] = useState(null);
    const [history, setHistory] = useState([]);
    const [turn, setTurn] = useState("w");

    const handleSquareClick = (position) => {
        if (selected) {
            const move = game.move({
                from: selected,
                to: position,
                promotion: "q",
            });
            if (move) {
                setGame(new Chess(game.fen()));
                setHistory(game.history({ verbose: true }));
                setTurn(game.turn());
            }
            setSelected(null);
        } else {
            const piece = game.get(position);
            if (piece && piece.color === turn) {
                setSelected(position);
            }
        }
    };

    const resetGame = () => {
        const newGame = new Chess();
        setGame(newGame);
        setSelected(null);
        setHistory([]);
        setTurn("w");
    };

    return {
        game,
        selected,
        history,
        turn,
        handleSquareClick,
        resetGame,
    };
};
