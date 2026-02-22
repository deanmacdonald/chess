export const dynamic = "force-dynamic";

import ChessBoard from "./ChessBoard";

export default async function Home() {
  // Detect correct base URL (Vercel or local)
  const base =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  const res = await fetch(`${base}/api/chess`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch board data");
  }

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
