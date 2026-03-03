export default function MoveListDialog({ moves }) {
  return (
    <div className="move-list">
      <h3>Move List</h3>
      {moves.length === 0 ? (
        <p>No moves yet.</p>
      ) : (
        <ul>
          {moves.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
