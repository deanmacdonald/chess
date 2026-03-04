import dynamic from "next/dynamic";

const GameScreen = dynamic(() => import("../src/screens/GameScreen"), {
  ssr: false,
});

export default function Home() {
  return <GameScreen />;
}
