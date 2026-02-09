from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from game.router import router as game_router

app = FastAPI(title="Chess Backend")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(game_router, prefix="/api")

@app.get("/")
def root():
    return {"status": "ok", "message": "Backend running"}


# Uvicorn runner
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=False
    )
