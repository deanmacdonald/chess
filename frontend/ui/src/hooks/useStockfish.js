import { useEffect, useRef } from 'react'
import Worker from '@/logic/engine/stockfish.worker.js?worker'

export default function useStockfish(onMessage) {
  const workerRef = useRef(null)

  useEffect(() => {
    workerRef.current = new Worker()

    workerRef.current.onmessage = (e) => {
      onMessage?.(e.data)
    }

    return () => {
      workerRef.current.terminate()
    }
  }, [onMessage])

  const send = (cmd) => {
    workerRef.current?.postMessage(cmd)
  }

  return { send }
}
