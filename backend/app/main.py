"""
FairLens Backend — FastAPI Application Entry Point
"""
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.routers import audits, chat, simulation, mitigations, certificates

load_dotenv()

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    # Startup: initialize Firebase Admin, connections, etc.
    from app.services.auth import initialize_firebase
    initialize_firebase()
    yield
    # Shutdown: cleanup


app = FastAPI(
    title="FairLens API",
    description="AI Bias Detection & Mitigation Platform",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(audits.router, prefix="/api/v1", tags=["Audits"])
app.include_router(chat.router, prefix="/api/v1", tags=["Chat"])
app.include_router(simulation.router, prefix="/api/v1", tags=["Simulation"])
app.include_router(mitigations.router, prefix="/api/v1", tags=["Mitigations"])
app.include_router(certificates.router, prefix="/api/v1", tags=["Certificates"])


@app.get("/api/v1/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "fairlens-api", "version": "1.0.0"}
