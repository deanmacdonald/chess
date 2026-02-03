from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.database import Base, engine
from routes.game import router as game_router

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
# CORS configuration
# ---------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# Health check endpoint
# ---------------------------------------------------------
@app.get("/status")
def status():
    return {"service": "chess-backend", "status": "ok"}

# ---------------------------------------------------------
# Legacy health endpoint for old frontend
# ---------------------------------------------------------
@app.get("/health")
def legacy_health():
    return {"service": "chess-backend", "status": "ok"}

# ---------------------------------------------------------
# Register all chess routes
# ---------------------------------------------------------
app.include_router(game_router)

