export default function ThemeSwitcher({ theme, onChange }) {
  return (
    <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
      <button
        onClick={() => onChange("tron")}
        disabled={theme === "tron"}
        style={{ padding: "0.25rem 0.75rem" }}
      >
        Tron
      </button>
      <button
        onClick={() => onChange("wood")}
        disabled={theme === "wood"}
        style={{ padding: "0.25rem 0.75rem" }}
      >
        Wood
      </button>
    </div>
  );
}
