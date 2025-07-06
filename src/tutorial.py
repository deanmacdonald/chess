import sys
from PyQt5.QtWidgets import (
    QApplication, QWidget, QGridLayout, QLabel, QSizePolicy
)
from PyQt5.QtGui import QPalette, QColor, QMouseEvent
from PyQt5.QtCore import Qt, QSize


class ChessSquare(QLabel):
    def __init__(self, row: int, col: int, callback=None):
        super().__init__()
        self.row = row
        self.col = col
        self.callback = callback
        self.setAutoFillBackground(True)
        self.setAlignment(Qt.AlignCenter)
        self.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
        self.setMouseTracking(True)
        self.update_color()

    def update_color(self):
        palette = self.palette()
        base_color = QColor(240, 217, 181) if (self.row + self.col) % 2 == 0 else QColor(181, 136, 99)
        palette.setColor(QPalette.Window, base_color)
        self.setPalette(palette)

    def mousePressEvent(self, event: QMouseEvent):
        if event.button() == Qt.LeftButton and self.callback:
            self.callback(self.row, self.col)

    def sizeHint(self) -> QSize:
        return QSize(60, 60)


class ChessBoard(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("PyQt5 Chess Board")
        self.board_state = [[None for _ in range(8)] for _ in range(8)]
        self.init_ui()

    def init_ui(self):
        layout = QGridLayout()
        layout.setSpacing(0)
        layout.setContentsMargins(0, 0, 0, 0)

        for row in range(8):
            for col in range(8):
                square = ChessSquare(row, col, self.handle_click)
                layout.addWidget(square, row, col)

        self.setLayout(layout)
        self.resize(600, 600)

    def handle_click(self, row: int, col: int):
        print(f"Clicked on square: ({row}, {col})")
        # Future: highlight, select, or move pieces here


if __name__ == "__main__":
    app = QApplication(sys.argv)
    board = ChessBoard()
    board.show()
    sys.exit(app.exec_())
