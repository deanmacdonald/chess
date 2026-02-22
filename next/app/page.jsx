export const dynamic = "force-dynamic";

import ChessBoard from "./ChessBoard";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/chess", {
    cache: "no-store",
  });

  const board = await res.json();

  return (
    <main
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <h1 style={{ fontSize: 32, marginBottom: 10 }}>Chess Game</h1>
      <ChessBoard board={board} />
    </main>
  );
}
