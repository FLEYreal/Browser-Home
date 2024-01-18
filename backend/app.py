# FastAPI Imports
from fastapi import FastAPI


# Variables
app = FastAPI()


# Routes
@app.get("/")
async def root():
    return {"message": "Hello World!"}


