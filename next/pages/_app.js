import "../styles/styles.css";
import "../src/MoveList.css";
import "../src/PlayerHeader.css";
import GameStateProvider from "../src/context/GameStateProvider";

export default function MyApp({ Component, pageProps }) {
  return (
    <GameStateProvider>
      <Component {...pageProps} />
    </GameStateProvider>
  );
}
