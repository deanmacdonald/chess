#!/bin/bash

echo "🧹 Cleaning up swap and temp files..."
rm -f .game.py.swo .game.py.swp .game.swp .pieces.py.swp

echo "📦 Archiving ambiguous folders..."
mkdir -p archive
mv '=' creating ERROR pulling '[internal]' archive/ 2>/dev/null

echo "🧼 Removing __pycache__ and .pyc files..."
find . -type d -name "__pycache__" -exec rm -r {} + 2>/dev/null
find . -type f -name "*.pyc" -delete 2>/dev/null

echo "✅ Cleanup complete."
