import React from "react";

function MoveHistory({ moves }) {
  // Group moves into pairs: [whiteMove, blackMove]
  const pairedMoves = [];
  for (let i = 0; i < moves.length; i += 2) {
    pairedMoves.push([moves[i], moves[i + 1] || ""]);
  }

  return (
    <div className="move-history">
      <h2>Move History</h2>
      <table>
        <thead>
          <tr>
            <th>Turn</th>
            <th>White</th>
            <th>Black</th>
          </tr>
        </thead>
        <tbody>
          {pairedMoves.map((pair, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{pair[0]}</td>
              <td>{pair[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MoveHistory;
