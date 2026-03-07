import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { indexToSquare } from "../lib/indexToSquare";

import wp from "../assets/pieces/classic/wp.svg";
import bp from "../assets/pieces/classic/bp.svg";
import wr from "../assets/pieces/classic/wr.svg";
import br from "../assets/pieces/classic/br.svg";
import wn from "../assets/pieces/classic/wn.svg";
import bn from "../assets/pieces/classic/bn.svg";
import wb from "../assets/pieces/classic/wb.svg";
import bb from "../assets/pieces/classic/bb.svg";
import wq from "../assets/pieces/classic/wq.svg";
import bq from "../assets/pieces/classic/bq.svg";
import wk from "../assets/pieces/classic/wk.svg";
import bk from "../assets/pieces/classic/bk.svg";

const SVG_MAP = {
  p: bp,
  r: br,
  n: bn,
  b: bb,
  q: bq,
  k: bk,
  P: wp,
  R: wr,
  N: wn,
  B: wb,
  Q: wq,
  K: wk
};

const tronTheme = {
  frame: "#020617",
  light: "#0f172a",
  dark: "#020617",
  coord: "#38bdf8",
  highlight: "#f97316"
};

const woodTheme = {
  frame: "#3b2f2f",
  light: "#d7b899",
  dark: "#8b5a2b",
  coord: "#111827",
  highlight: "#facc15"
};

const themeMap = { tron: tronTheme, wood: woodTheme };

export default function Board({ gameId, theme, onMoveCommitted }) {
  const [selected, setSelected] = useState(null);
  const [chess, setChess] = useState(() => new Chess());

  useEffect(() => {
    setChess(new Chess());
    setSelected(null);
  }, [gameId]);

  const t = themeMap[theme];

  async function handleClick(i) {
    if (selected === null) {
      setSelected(i);
      return;
    }

    const from = indexToSquare(selected);
    const to = indexToSquare(i);

    const clone = new Chess(chess.fen());
    const res = clone.move({ from, to, promotion: "q" });

    setSelected(null);

    if (!res) return;

    setChess(clone);

    const resp = await fetch("/api/moves", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId, from, to })
    });

    if (!resp.ok) return;

    const data = await resp.json();
    onMoveCommitted?.(data);
  }

  const boardArray = chess.board();

  return (
    <div style={{ display: "inline-block", padding: "1rem", background: t.frame }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto repeat(8, 50px)",
          gridTemplateRows: "repeat(8, 50px) auto"
        }}
      >
        {Array.from({ length: 8 }).map((_, rankIndex) => {
          const rank = 8 - rankIndex;
          return (
            <>
              <div
                key={`rank-${rank}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: t.coord,
                  fontSize: 14
                }}
              >
                {rank}
              </div>

              {Array.from({ length: 8 }).map((__, fileIndex) => {
                const i = rankIndex * 8 + fileIndex;
                const piece = boardArray[rankIndex][fileIndex];
                const isLight = (rankIndex + fileIndex) % 2 === 0;
                const isSelected = selected === i;

                const key =
                  piece && (piece.color === "w" ? piece.type.toUpperCase() : piece.type);
                const src = key ? SVG_MAP[key] : null;

                return (
                  <div
                    key={i}
                    onClick={() => handleClick(i)}
                    style={{
                      width: 50,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      background: isLight ? t.light : t.dark,
                      outline: isSelected ? `3px solid ${t.highlight}` : "none",
                      userSelect: "none"
                    }}
                  >
                    {src && (
                      <img
                        src={src}
                        alt={key}
                        style={{ width: "40px", height: "40px", pointerEvents: "none" }}
                      />
                    )}
                  </div>
                );
              })}
            </>
          );
        })}

        <div />

        {Array.from({ length: 8 }).map((_, fileIndex) => {
          const file = "abcdefgh"[fileIndex];
          return (
            <div
              key={`file-${file}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: t.coord,
                fontSize: 14
              }}
            >
              {file}
            </div>
          );
        })}
      </div>
    </div>
  );
}
