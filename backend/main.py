from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import database + router
from db.database import Base, engine
from src.api.game import router as game_router


def init_db():
    Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Chess Backend",
    description="A persistent multi‑game FastAPI backend powered by python‑chess and SQLite.",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/status")
def status():
    return {
        "service": "chess-backend",
        "status": "ok",
        "database": "connected",
    }

# Register routers
app.include_router(game_router)

@app.on_event("startup")
def startup_event():
    init_db()
    print("🚀 Chess backend started and database initialized")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
