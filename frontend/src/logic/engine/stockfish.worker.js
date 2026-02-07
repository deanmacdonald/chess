import Stockfish from 'stockfish'

const engine = Stockfish()

engine.onmessage = (event) => {
  postMessage(event.data)
}

onmessage = (event) => {
  engine.postMessage(event.data)
}
