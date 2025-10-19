import React, { useState } from "react";
import ChessBoard from "./components/ChessBoard";
import "./App.css";
import pieceImages from "./assets/piecesImage";

// Demo position
const initialPosition = {
    e4: "wp",
    d5: "bp",
    f3: "wn",
    c6: "bn",
    g1: "wk",
    g8: "bk",
};

function App() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [showCoordinates, setShowCoordinates] = useState(true);
    const [showPieces, setShowPieces] = useState(true);
    const [theme, setTheme] = useState("wood");
    const [pieceStyle, setPieceStyle] = useState("standard");

    return (
        <div className="app-container">
            <header>
                <h1>♟️ React Chess Board</h1>
            </header>

            <section className="controls">
                <div className="toggle-group">
                    <button onClick={() => setIsFlipped(!isFlipped)}>
                        {isFlipped ? "Unflip Board" : "Flip Board"}
                    </button>
                    <button
                        onClick={() => setShowCoordinates(!showCoordinates)}
                    >
                        {showCoordinates
                            ? "Hide Coordinates"
                            : "Show Coordinates"}
                    </button>
                    <button onClick={() => setShowPieces(!showPieces)}>
                        {showPieces ? "Hide Pieces" : "Show Pieces"}
                    </button>
                </div>

                <div className="select-group">
                    <label>
                        Theme:
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                        >
                            <option value="wood">Wood</option>
                            <option value="classic">Classic</option>
                            <option value="dark">Dark</option>
                        </select>
                    </label>

                    <label>
                        Piece Style:
                        <select
                            value={pieceStyle}
                            onChange={(e) => setPieceStyle(e.target.value)}
                        >
                            <option value="standard">Standard</option>
                            {/* Add more styles here */}
                        </select>
                    </label>
                </div>
            </section>

            <section className="board-wrapper">
                <ChessBoard
                    showCoordinates={showCoordinates}
                    theme={theme}
                    showPieces={showPieces}
                    pieceStyle={pieceStyle}
                    piecePositions={initialPosition}
                    isFlipped={isFlipped}
                />
            </section>
        </div>
    );
}

export default App;
