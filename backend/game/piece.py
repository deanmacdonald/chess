class Piece:
    def __init__(self, color, position):
        self.color = color
        self.position = position
        self.name = self.__class__.__name__.lower()
        self.image_path = f"assets/images/pieces/{self.color}-{self.name}.png"

    def symbol(self):
        return self.name[0].upper() if self.color == "white" else self.name[0].lower()

    def get_image_path(self):
        return self.image_path

