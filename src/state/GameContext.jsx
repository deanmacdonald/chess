import { createContext, useContext, useState } from 'react'

const GameContext = createContext()

export function GameProvider({ children }) {
  const [history, setHistory] = useState([])
  const [turn, setTurn] = useState('w')

  return (
    <GameContext.Provider value={{ history, setHistory, turn, setTurn }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  return useContext(GameContext)
}
