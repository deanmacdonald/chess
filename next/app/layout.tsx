import { GameStateProvider } from "./context/GameStateProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0f14] text-[#e8fefe] font-sans flex flex-col items-center py-10">
        <GameStateProvider>
          <div className="w-full max-w-4xl px-4">
            {children}
          </div>
        </GameStateProvider>
      </body>
    </html>
  );
}
