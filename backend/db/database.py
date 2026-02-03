from sqlalchemy import create_engine, Column, String, Text
from sqlalchemy.orm import declarative_base, sessionmaker

# ---------------------------------------------------------
# Database configuration
# ---------------------------------------------------------
DATABASE_URL = "sqlite:///./chess.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # Required for SQLite + FastAPI
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# ---------------------------------------------------------
# Game Model
# ---------------------------------------------------------
class Game(Base):
    __tablename__ = "games"

    game_id = Column(String, primary_key=True, index=True)
    fen = Column(Text, nullable=False)
    turn = Column(String, nullable=False)
    last_move = Column(String, nullable=True)

# ---------------------------------------------------------
# Database helper
# ---------------------------------------------------------
def get_db():
    """
    FastAPI dependency for getting a DB session.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

