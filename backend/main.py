from fastapi import FastAPI
from routes.game import router as game_router
from db.database import Base, engine

# ---------------------------------------------------------
# Create all database tables on startup
# ---------------------------------------------------------
Base.metadata.create_all(bind=engine)

# ---------------------------------------------------------
# FastAPI application
# ---------------------------------------------------------
app = FastAPI(
    title="Chess Backend",
    description="A persistent multi‑game FastAPI backend powered by python‑chess and SQLite.",
    version="1.0.0"
)

# ---------------------------------------------------------
# Health check endpoint
# ---------------------------------------------------------
@app.get("/status")
def status():
    return {"service": "chess-backend", "status": "ok"}

# ---------------------------------------------------------
# Register all chess routes
# ---------------------------------------------------------
app.include_router(game_router)

