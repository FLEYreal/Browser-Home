# FastAPI Imports
from fastapi import FastAPI

# Modules
from routers import item, shelf

# Variables
app = FastAPI(
    prefix="/api/v1"
)

# Include routers
app.include_router(item.router)
app.include_router(shelf.router)
