import sys
from PyQt5.QtWidgets import QApplication, QWidget, QGridLayout, QLabel
from PyQt5.QtGui import QPalette

class ChessBoard(QWidget):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        self.setWindowTitle("Chess Game")
        self.setFixedSize(400, 400)

        layout = QGridLayout()
        for row in range(8):
            for col in range(8):
                square = QLabel()
                square.setAutoFillBackground(True)
                color = QPalette.ColorRole.Window
                palette = square.palette()
                palette.setColor(QPalette.Window, 
                                 "white" if (row + col) % 2 == 0 else "black")
                square.setPalette(palette)
                layout.addWidget(square, row, col)

        self.setLayout(layout)

app = QApplication(sys.argv)
window = ChessBoard()
window.show()
sys.exit(app.exec_())
