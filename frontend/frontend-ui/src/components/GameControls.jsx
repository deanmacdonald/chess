import React from "react";

const GameControls = ({ onReset }) => (
    <div style={{ marginTop: "1rem" }}>
        <button onClick={onReset}>Reset Game</button>
    </div>
);

export default GameControls;
