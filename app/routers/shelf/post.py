# Built-In Imports
from typing import List, Optional

# FastAPI Imports
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

# SQLAlchemy Imports
from sqlalchemy.orm import Session

# Libs
from pydantic import BaseModel, Field

# Modules
from app.db.db import get_db
from app.db.model.Shelves import Shelves

# Utils
from ...utils.responses import responses, generate_response

# Router
router = APIRouter()


class ShelfPostBody(BaseModel):
    title: str = Field(min_length=1, max_length=32)  # Title of the Shelf
    description: str = Field(min_length=1, max_length=256)  # Description of the Shelf
    color: Optional[str] = Field('#A0A0A0', min_length=1, max_length=7)  # Which color to use for the Shelf


@router.post("/")
async def shelf_post(body: List[ShelfPostBody], db: Session = Depends(get_db)):
    """
    Inserts new shelf(ves) data into a database table.

    Queries: None
    Body: [{
        title: str = Field(min_length=1, max_length=32)
        description: str = Field(min_length=1, max_length=128)
        color: Optional[str] = Field(None, min_length=1, max_length=7)
    }]

    Returns:
        JSONResponse: Returns Operation Details.
    """

    try:

        result = Shelves.create(shelves=body, db=db)

        return generate_response(**result)

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])
