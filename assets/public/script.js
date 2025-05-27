fetch('/make_move', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ move: 'e2 e4' })
}).then(response => response.json())
  .then(data => console.log(data));
