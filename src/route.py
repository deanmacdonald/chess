@app.route('/make_move', methods=['POST'])
def make_move():
    move = request.json.get('move')
    return jsonify({'status': 'Move received!', 'move': move})
