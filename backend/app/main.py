from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from app.routes import chat, auth, admin
from app.database import engine, Base
from app.models import models

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI App
app = FastAPI(
    title="NRN Smart Learning Backend",
    description="Engine for the Multimodal AI Tutor Platform",
    version="1.0.0"
)

# Ensure static directory exists
UPLOAD_DIR = os.path.join(os.getcwd(), "static", "uploads")
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR, exist_ok=True)

# Mount Static Files
app.mount("/static", StaticFiles(directory="static"), name="static")

from app.core.config import settings

# Configure CORS
origins = settings.ALLOWED_ORIGINS.split(",") if settings.ALLOWED_ORIGINS else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect the routers
app.include_router(chat.router, prefix="/api")
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin Dashboard"])

@app.get("/")
def health_check():
    return {"status": "ok", "message": "NRN Smart Learning Backend is running!"}
