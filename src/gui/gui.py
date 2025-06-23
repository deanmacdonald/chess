import sys
from PyQt5.QtWidgets import QApplication, QWidget, QGridLayout, QLabel, QSizePolicy
from PyQt5.QtGui import QPalette, QColor
from PyQt5.QtCore import Qt

class Square(QLabel):
    def __init__(self, row, col):
        super().__init__()
        self.row = row
        self.col = col
        self.setAutoFillBackground(True)
        self.setAlignment(Qt.AlignCenter)
        self.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
        self.update_color()

    def update_color(self):
        palette = self.palette()
        color = QColor(240, 217, 181) if (self.row + self.col) % 2 == 0 else QColor(181, 136, 99)
        palette.setColor(QPalette.Window, color)
        self.setPalette(palette)

class ChessBoard(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Chess Game")
        self.resize(600, 600)
        self.init_ui()

    def init_ui(self):
        layout = QGridLayout()
        layout.setSpacing(0)
        layout.setContentsMargins(0, 0, 0, 0)

        for row in range(8):
            for col in range(8):
                square = Square(row, col)
                layout.addWidget(square, row, col)

        self.setLayout(layout)

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = ChessBoard()
    window.show()
    sys.exit(app.exec_())
