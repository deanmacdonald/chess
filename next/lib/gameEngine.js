// Simple chess engine for your API routes
// Board stored as 8x8 array, algebraic coords (e.g., "e2")

class ChessEngine {
  constructor() {
    this.reset();
  }

  reset() {
    // Basic starting position
    this.board = [
      ["r","n","b","q","k","b","n","r"],
      ["p","p","p","p","p","p","p","p"],
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["P","P","P","P","P","P","P","P"],
      ["R","N","B","Q","K","B","N","R"]
    ];

    this.turn = "white"; // white moves first
  }

  // Convert "e2" → { row: 6, col: 4 }
  parseSquare(square) {
    const file = square[0].toLowerCase();
    const rank = parseInt(square[1], 10);

    return {
      row: 8 - rank,
      col: file.charCodeAt(0) - 97
    };
  }

  getPiece(square) {
    const { row, col } = this.parseSquare(square);
    return this.board[row][col];
  }

  setPiece(square, piece) {
    const { row, col } = this.parseSquare(square);
    this.board[row][col] = piece;
  }

  isWhite(piece) {
    return piece && piece === piece.toUpperCase();
  }

  isBlack(piece) {
    return piece && piece === piece.toLowerCase();
  }

  getState() {
    return {
      board: this.board,
      turn: this.turn
    };
  }

  // Very simplified legal move generator (non‑checking, non‑castling)
  getLegalMoves(from) {
    const piece = this.getPiece(from);
    if (!piece) return [];

    const isWhite = this.isWhite(piece);
    const moves = [];

    const { row, col } = this.parseSquare(from);

    const addMove = (r, c) => {
      if (r < 0 || r > 7 || c < 0 || c > 7) return;
      const target = this.board[r][c];
      if (!target || this.isWhite(piece) !== this.isWhite(target)) {
        moves.push(this.toSquare(r, c));
      }
    };

    // Pawn movement
    if (piece.toLowerCase() === "p") {
      const dir = isWhite ? -1 : 1;
      const startRow = isWhite ? 6 : 1;

      // Forward
      if (!this.board[row + dir][col]) {
        addMove(row + dir, col);

        // Double move
        if (row === startRow && !this.board[row + dir * 2][col]) {
          addMove(row + dir * 2, col);
        }
      }

      // Captures
      for (const dc of [-1, 1]) {
        const r = row + dir;
        const c = col + dc;
        if (r >= 0 && r <= 7 && c >= 0 && c <= 7) {
          const target = this.board[r][c];
          if (target && this.isWhite(piece) !== this.isWhite(target)) {
            addMove(r, c);
          }
        }
      }
    }

    // Knight movement
    if (piece.toLowerCase() === "n") {
      const jumps = [
        [1,2],[2,1],[-1,2],[-2,1],
        [1,-2],[2,-1],[-1,-2],[-2,-1]
      ];
      jumps.forEach(([dr, dc]) => addMove(row + dr, col + dc));
    }

    // Rook movement
    if (piece.toLowerCase() === "r" || piece.toLowerCase() === "q") {
      const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
      dirs.forEach(([dr, dc]) => {
        let r = row + dr, c = col + dc;
        while (r >= 0 && r <= 7 && c >= 0 && c <= 7) {
          const target = this.board[r][c];
          if (!target) {
            addMove(r, c);
          } else {
            if (this.isWhite(piece) !== this.isWhite(target)) addMove(r, c);
            break;
          }
          r += dr; c += dc;
        }
      });
    }

    // Bishop movement
    if (piece.toLowerCase() === "b" || piece.toLowerCase() === "q") {
      const dirs = [[1,1],[1,-1],[-1,1],[-1,-1]];
      dirs.forEach(([dr, dc]) => {
        let r = row + dr, c = col + dc;
        while (r >= 0 && r <= 7 && c >= 0 && c <= 7) {
          const target = this.board[r][c];
          if (!target) {
            addMove(r, c);
          } else {
            if (this.isWhite(piece) !== this.isWhite(target)) addMove(r, c);
            break;
          }
          r += dr; c += dc;
        }
      });
    }

    // King movement
    if (piece.toLowerCase() === "k") {
      const steps = [
        [1,0],[-1,0],[0,1],[0,-1],
        [1,1],[1,-1],[-1,1],[-1,-1]
      ];
      steps.forEach(([dr, dc]) => addMove(row + dr, col + dc));
    }

    return moves;
  }

  toSquare(row, col) {
    const file = String.fromCharCode(97 + col);
    const rank = 8 - row;
    return file + rank;
  }

  makeMove(from, to) {
    const piece = this.getPiece(from);
    if (!piece) return { error: "No piece at source square" };

    const legal = this.getLegalMoves(from);
    if (!legal.includes(to)) {
      return { error: "Illegal move" };
    }

    this.setPiece(to, piece);
    this.setPiece(from, "");

    this.turn = this.turn === "white" ? "black" : "white";

    return {
      board: this.board,
      turn: this.turn
    };
  }
}

const game = new ChessEngine();
export default game;
