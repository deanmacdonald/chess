import React from "react";
import ChessBoard from "../components/ChessBoard";
import PlayerHeader from "../components/PlayerHeader";
import ChessClock from "../components/ChessClock";
import CapturedPieces from "../components/CapturedPieces";
import useGameState from "../hooks/useGameState";

export default function GameScreen() {
    const {
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
    } = useGameState();

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "row",
                background: "#111",
                color: "#fff",
                overflow: "hidden",
            }}
        >
            {/* LEFT SIDE — BOARD + CLOCKS */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 16,
                }}
            >
                {/* TOP PLAYER */}
                <div style={{ width: "100%", maxWidth: 520, marginBottom: 8 }}>
                    <PlayerHeader
                        name="Black"
                        rating={1500}
                        isTurn={turn === "black"}
                    />
                    <ChessClock
                        timeLeft={blackTime}
                        running={turn === "black"}
                        style={{
                            fontSize: 28,
                            fontWeight: 700,
                            background: "#222",
                            padding: 10,
                            borderRadius: 8,
                            textAlign: "center",
                            marginTop: 6,
                        }}
                    />
                    <CapturedPieces pieces={capturedBlack} />
                </div>

                {/* CHESS BOARD */}
                <div style={{ marginTop: 12, marginBottom: 12 }}>
                    <ChessBoard
                        board={board}
                        legalMoves={legalMoves}
                        lastMove={lastMove}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    />
                </div>

                {/* BOTTOM PLAYER */}
                <div style={{ width: "100%", maxWidth: 520, marginTop: 8 }}>
                    <CapturedPieces pieces={capturedWhite} />
                    <ChessClock
                        timeLeft={whiteTime}
                        running={turn === "white"}
                        style={{
                            fontSize: 28,
                            fontWeight: 700,
                            background: "#222",
                            padding: 10,
                            borderRadius: 8,
                            textAlign: "center",
                            marginBottom: 6,
                        }}
                    />
                    <PlayerHeader
                        name="Dean"
                        rating={1400}
                        isTurn={turn === "white"}
                    />
                </div>
            </div>

            {/* RIGHT SIDE — FULL MOVE LIST PANEL */}
            <div
                style={{
                    width: 300,
                    background: "#1a1a1a",
                    borderLeft: "2px solid #333",
                    padding: 16,
                    overflowY: "auto",
                }}
            >
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
                    Move List
                </h2>

                {moveHistory.length === 0 && (
                    <div style={{ opacity: 0.5, fontSize: 16 }}>
                        No moves yet
                    </div>
                )}

                {moveHistory.map((m, i) => (
                    <div
                        key={i}
                        style={{
                            padding: "6px 0",
                            borderBottom: "1px solid #333",
                            fontSize: 18,
                        }}
                    >
                        {i + 1}. {m.white} {m.black || ""}
                    </div>
                ))}
            </div>
        </div>
    );
}
