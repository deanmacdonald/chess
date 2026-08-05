"use client";

import ChessStage from "./ChessStage";

export default function Page() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-cyan-300 drop-shadow-[0_0_12px_rgba(0,255,255,0.6)]">
        Black Knight Chess
      </h1>

      <div className="flex justify-center items-center p-6">
        <div className="border-2 border-cyan-300 rounded-xl shadow-[0_0_25px_rgba(0,255,255,0.4)]">
          <ChessStage />
        </div>
      </div>
    </main>
  );
}
