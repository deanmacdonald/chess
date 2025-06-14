class ChessBoard {
    private val board = Array(8) { Array<ChessPiece?>(8) { null } }

    fun setupBoard() {
        // Add pawns
        for (i in 0..7) {
            board[1][i] = Pawn("White")
            board[6][i] = Pawn("Black")
        }
        // Add knights
        board[0][1] = Knight("White")
        board[0][6] = Knight("White")
        board[7][1] = Knight("Black")
        board[7][6] = Knight("Black")
    }

    fun printBoard() {
        for (row in board) {
            println(row.joinToString(" ") { it?.name ?: "." })
        }
    }
}
