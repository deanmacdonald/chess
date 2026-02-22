export const dynamic = "force-dynamic";

import { headers } from "next/headers";
import ChessBoard from "./ChessBoard";

export default async function Home() {
  const host = headers().get("host");
  const protocol = host.includes("localhost") ? "http" : "https";
  const base = `${protocol}://${host}`;

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
