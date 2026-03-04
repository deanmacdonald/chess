import useGameState from "./useGameState";

export default function useMoveList() {
  const { state } = useGameState();

  return {
    moves: state.moves || [],
  };
}
