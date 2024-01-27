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


class ShelfUpdateBody(BaseModel):
    shelf_id: int
    title: Optional[str] = Field(None, min_length=1, max_length=32)  # New Title for the Shelf
    description: Optional[str] = Field(None, min_length=1, max_length=256)  # New Description for the Shelf
    color: Optional[str] = Field(None, min_length=1, max_length=7)  # New Color for the Shelf


@router.post("/update")
async def shelf_update_post(body: List[ShelfUpdateBody], db: Session = Depends(get_db)):
    """
    Updates a shelf(ves) data in a database table.

    Queries: None
    Body: [{
        shelf_id: int
        title: Optional[str] = Field(None, min_length=1, max_length=32)
        description: Optional[str] = Field(None, min_length=1, max_length=256)
        color: Optional[str] = Field('#A0A0A0', min_length=1, max_length=7)
    ]}

    Returns:
        JSONResponse: Returns Operation Details.
    """

    try:

        shelves_db = Shelves()
        result = shelves_db.update(shelves=body, db=db)

        return generate_response(**result)

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])
