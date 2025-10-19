import React from "react";

const MoveHistory = ({ history }) => {
    return (
        <div className="move-history">
            <h3>Move History</h3>
            <ol>
                {history.map((move, i) => (
                    <li key={i}>{move.san}</li>
                ))}
            </ol>
        </div>
    );
};

export default MoveHistory;
