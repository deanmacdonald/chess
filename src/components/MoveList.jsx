export default function MoveList({ moves }) {
  return (
    <div style={{ minWidth: "180px" }}>
      <h3>Moves</h3>
      <ul>
        {moves.map((m) => (
          <li key={m.id ?? `${m.move_number}-${m.uci}`}>
            #{m.move_number} {m.san ?? m.uci}
          </li>
        ))}
      </ul>
    </div>
  );
}
