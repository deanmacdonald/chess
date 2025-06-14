package chess

// Abstract class for all chess pieces
abstract class ChessPiece(val color: String) {
    abstract fun isValidMove(startX: Int, startY: Int, endX: Int, endY: Int): Boolean
}

// Pawn class with movement validation
class Pawn(color: String) : ChessPiece(color) {
    override fun isValidMove(startX: Int, startY: Int, endX: Int, endY: Int): Boolean {
        val direction = if (color == "White") 1 else -1
        return (endY - startY == direction && startX == endX)
    }
}

// Knight class with L-shaped movement validation
class Knight(color: String) : ChessPiece(color) {
    override fun isValidMove(startX: Int, startY: Int, endX: Int, endY: Int): Boolean {
        return (Math.abs(startX - endX) == 2 && Math.abs(startY - endY) == 1) ||
               (Math.abs(startX - endX) == 1 && Math.abs(startY - endY) == 2)
    }
}

// Chess board to manage pieces and moves
class ChessBoard {
    private val board = Array(8) { Array<ChessPiece?>(8) { null } }

    fun placePiece(piece: ChessPiece, x: Int, y: Int) {
        board[y][x] = piece
    }

    fun movePiece(startX: Int, startY: Int, endX: Int, endY: Int): Boolean {
        val piece = board[startY][startX] ?: return false
        if (piece.isValidMove(startX, startY, endX, endY)) {
            board[endY][endX] = piece
            board[startY][startX] = null
            return true
        }
        return false
    }
}

// Main function to test chess movement
fun main() {
    val chessBoard = ChessBoard()
    
    val whitePawn = Pawn("White")
    val blackKnight = Knight("Black")

    chessBoard.placePiece(whitePawn, 1, 1)
    chessBoard.placePiece(blackKnight, 1, 0)

    println("White Pawn move valid? " + chessBoard.movePiece(1, 1, 1, 2))
    println("Black Knight move valid? " + chessBoard.movePiece(1, 0, 2, 2))
}
