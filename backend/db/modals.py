from sqlalchemy import Column, String, Text
from db.database import Base

class Game(Base):
    __tablename__ = "games"

    game_id = Column(String, primary_key=True, index=True)
    fen = Column(Text, nullable=False)
    turn = Column(String, nullable=False)

