import React, { useRef, useEffect, useState } from "react";
import ChessPiece from "./ChessPiece";

export default function ChessBoard({
    board,
    legalMoves,
    lastMove,
    onDragStart,
    onDragEnd,
}) {
    const boardRef = useRef(null);
    const [squareSize, setSquareSize] = useState(0);

    // Compute square size from board width
    useEffect(() => {
        const updateSize = () => {
            if (!boardRef.current) return;
            const rect = boardRef.current.getBoundingClientRect();
            setSquareSize(rect.width / 8);
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const renderSquares = () => {
        const squares = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const isDark = (row + col) % 2 === 1;
                squares.push(
                    <div
                        key={`sq-${row}-${col}`}
                        style={{
                            position: "absolute",
                            left: col * squareSize,
                            top: row * squareSize,
                            width: squareSize,
                            height: squareSize,
                            background: isDark ? "#b58863" : "#f0d9b5",
                        }}
                    />,
                );
            }
        }
        return squares;
    };

    const renderLastMove = () => {
        if (!lastMove) return null;
        const { from, to } = lastMove;

        return (
            <>
                {[from, to].map((sq, i) => (
                    <div
                        key={`last-${i}`}
                        style={{
                            position: "absolute",
                            left: sq.col * squareSize,
                            top: sq.row * squareSize,
                            width: squareSize,
                            height: squareSize,
                            background: "rgba(255,255,0,0.35)",
                            pointerEvents: "none",
                        }}
                    />
                ))}
            </>
        );
    };

    const renderLegalMoves = () => {
        if (!legalMoves) return null;

        return legalMoves.map((m, i) => (
            <div
                key={`legal-${i}`}
                style={{
                    position: "absolute",
                    left: m.col * squareSize,
                    top: m.row * squareSize,
                    width: squareSize,
                    height: squareSize,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                }}
            >
                <div
                    style={{
                        width: squareSize * 0.25,
                        height: squareSize * 0.25,
                        borderRadius: "50%",
                        background: "rgba(0,0,0,0.25)",
                    }}
                />
            </div>
        ));
    };

    const renderPieces = () => {
        const pieces = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (!piece) continue;

                pieces.push(
                    <ChessPiece
                        key={`${piece.color}${piece.type}-${row}-${col}`}
                        piece={piece}
                        row={row}
                        col={col}
                        squareSize={squareSize}
                        boardRef={boardRef}
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                    />,
                );
            }
        }
        return pieces;
    };

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div
                ref={boardRef}
                style={{
                    position: "relative",
                    width: "min(100vw, 100vh)",
                    height: "min(100vw, 100vh)",
                    border: "12px solid #5a3e2b",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
                    background: "#000",
                    overflow: "hidden",
                }}
            >
                {renderSquares()}
                {renderLastMove()}
                {renderLegalMoves()}
                {renderPieces()}
            </div>
        </div>
    );
}
