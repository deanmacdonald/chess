import { useState, useEffect, useCallback } from "react";

export default function useGameState() {
    const [board, setBoard] = useState([]);
    const [turn, setTurn] = useState("white");
    const [whiteTime, setWhiteTime] = useState(300);
    const [blackTime, setBlackTime] = useState(300);
    const [capturedWhite, setCapturedWhite] = useState([]);
    const [capturedBlack, setCapturedBlack] = useState([]);
    const [moveHistory, setMoveHistory] = useState([]);
    const [legalMoves, setLegalMoves] = useState([]);
    const [lastMove, setLastMove] = useState(null);

    // Load initial game state from backend
    useEffect(() => {
        fetch("/api/index.js", { method: "GET" })
            .then(res => res.json())
            .then(data => {
                setBoard(data.board);
                setTurn(data.turn);
                setCapturedWhite(data.capturedWhite);
                setCapturedBlack(data.capturedBlack);
                setMoveHistory(data.moveHistory);
                setLegalMoves(data.legalMoves);
                setLastMove(data.lastMove);
            })
            .catch(err => console.error("INIT ERROR:", err));
    }, []);

    // When a piece is picked up
    const handleDragStart = useCallback((fromSquare) => {
        fetch("/api/index.js", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "legalMoves", from: fromSquare })
        })
            .then(res => res.json())
            .then(data => setLegalMoves(data.legalMoves))
            .catch(err => console.error("LEGAL MOVE ERROR:", err));
    }, []);

    // When a piece is dropped
    const handleDragEnd = useCallback((from, to) => {
        fetch("/api/index.js", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "move", from, to })
        })
            .then(res => res.json())
            .then(data => {
                setBoard(data.board);
                setTurn(data.turn);
                setCapturedWhite(data.capturedWhite);
                setCapturedBlack(data.capturedBlack);
                setMoveHistory(data.moveHistory);
                setLegalMoves([]);
                setLastMove({ from, to });
            })
            .catch(err => console.error("MOVE ERROR:", err));
    }, []);

    return {
        board,
        turn,
        whiteTime,
        blackTime,
        capturedWhite,
        capturedBlack,
        moveHistory,
        legalMoves,
        lastMove,
        handleDragStart,
        handleDragEnd,
    };
}
