// Initialize board with custom piece images using absolute HTTP path
const board = Chessboard('board', {
  draggable: true,
  position: 'start',
  pieceTheme: function(piece) {
    return 'http://' + window.location.hostname + ':5000/static/img/chesspieces/wikipedia/' + piece + '.png';
  },
  onDrop: onDrop
});

// Local game state for frontend validation
const game = new Chess();

// Handle piece drop
function onDrop(source, target) {
  const moveObj = game.move({ from: source, to: target, promotion: 'q' });

  if (moveObj === null) {
    return 'snapback';
  }

  // Send move to backend for validation
  fetch('/move', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ move: moveObj.san })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      board.position(game.fen()); // revert move
      document.getElementById('status').textContent = data.error;
    } else {
      game.load(data.fen);
      board.position(data.fen);
      document.getElementById('status').textContent = data.is_game_over
        ? 'Game Over'
        : `${data.turn.charAt(0).toUpperCase() + data.turn.slice(1)} to move`;
    }
  })
  .catch(() => {
    board.position(game.fen());
    document.getElementById('status').textContent = 'Server error';
  });

  return 'snapback';
}

// Reset button handler
document.getElementById('resetBtn').addEventListener('click', () => {
  fetch('/reset', { method: 'POST' })
    .then(res => res.json())
    .then(() => {
      game.reset();
      board.start();
      document.getElementById('status').textContent = 'Game reset';
    });
});

