#!/data/data/com.termux/files/usr/bin/bash

# Update and upgrade Termux packages
pkg update -y && pkg upgrade -y

# Navigate to your project directory
cd ~/chess

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Run the app
python src/chessgame/main.py
