from PyQt5.QtWidgets import QApplication, QLabel
import sys
import os

# Set DISPLAY environment variable if not already set
if "DISPLAY" not in os.environ:
    os.environ["DISPLAY"] = ":0"

# Initialize QApplication
app = QApplication(sys.argv)

# Create and show label
label = QLabel('Hello, Chess!')
label.setStyleSheet("font-size: 20px; color: blue;")  # Adding some style
label.show()

# Execute the app
sys.exit(app.exec_())
