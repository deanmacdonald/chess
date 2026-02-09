import React from "react";

export default function ChessClock({ timeLeft, running, onPress }) {
    return (
        <div
            onClick={onPress}
            style={{
                width: "100%",
                padding: "10px 12px",
                background: running ? "#2d6a4f" : "#1e1e1e",
                color: "#fff",
                textAlign: "center",
                fontSize: 24,
                fontWeight: 700,
                borderRadius: "6px",
                margin: "6px 0",
                boxShadow: running ? "0 0 10px #2d6a4f" : "none",
                userSelect: "none",
            }}
        >
            {timeLeft}
        </div>
    );
}
