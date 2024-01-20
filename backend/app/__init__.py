# FastAPI Imports
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Modules
from .routers import item, shelf

# Variables
app = FastAPI(
    title="Browser-Home-API"
)

# Middlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "https://localhost",
        "http://localhost:7979",  # Backend Port
        "http://localhost:9797"  # Frontend Port
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(item.router)
app.include_router(shelf.router)
