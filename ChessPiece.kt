sealed class ChessPiece(val name: String, val color: String) {
    abstract fun isValidMove(startX: Int, startY: Int, endX: Int, endY: Int): Boolean
}

class Pawn(color: String) : ChessPiece("Pawn", color) {
    override fun isValidMove(startX: Int, startY: Int, endX: Int, endY: Int): Boolean {
        val direction = if (color == "White") 1 else -1

        // Normal one-step forward move
        if (startX == endX && endY == startY + direction) return true
        
        // First move: Two-step forward move
        if (startX == endX && (startY == 1 || startY == 6) && endY == startY + (2 * direction)) return true
        
        // Capture diagonally
        if (Math.abs(startX - endX) == 1 && endY == startY + direction) return true

        return false
    }
}

class Knight(color: String) : ChessPiece("Knight", color) {
    override fun isValidMove(startX: Int, startY: Int, endX: Int, endY: Int): Boolean {
        return (Math.abs(endX - startX) == 2 && Math.abs(endY - startY) == 1) ||
               (Math.abs(endX - startX) == 1 && Math.abs(endY - startY) == 2)
    }
}
