import os
import cairosvg

svg_root = os.path.join(os.path.dirname(__file__), "assets", "pieces", "chess-pieces")

for root, dirs, files in os.walk(svg_root):
    for filename in files:
        if filename.endswith(".svg"):
            svg_path = os.path.join(root, filename)
            png_path = os.path.join(root, filename.replace(".svg", ".png"))
            print(f"Converting {svg_path} → {png_path}")
            cairosvg.svg2png(url=svg_path, write_to=png_path)

