const move = game.move({ from: 'e2', to: 'e4' });

if (move === null) {
  // Invalid move — show a message or ignore
  console.warn('Invalid move attempted');
  return;
}

// Valid move — update UI
updateBoard(game.fen());
