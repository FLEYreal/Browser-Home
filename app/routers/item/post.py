# Built-In Imports
from typing import Optional, List

# FastAPI Imports
from fastapi import Depends, APIRouter, HTTPException
from fastapi.responses import JSONResponse

# SQLAlchemy Imports
from sqlalchemy.orm import Session

# Libs
from pydantic import BaseModel, Field

# Modules
from app.db.db import get_db
from app.db.model.Items import Items

# Utils
from ...utils.responses import responses, generate_response

# Router
router = APIRouter()


class ItemPostBody(BaseModel):
    shelf_fk: int  # Shelf ID item belongs to
    link: str  # Link of the Item
    title: str = Field(min_length=1, max_length=32)  # Title of the Item
    description: Optional[str] = Field(None, min_length=1, max_length=128)  # Description of the Item


@router.post("/")
async def item_post(body: List[ItemPostBody], db: Session = Depends(get_db)):
    """
    Insert a list of item(s) data into a database table.

    Queries: None
    Body: [{
        shelf_id: int
        link: str
        title: str = Field(min_length=1, max_length=32)
        description: Optional[str] = Field(min_length=1, max_length=128)
    }]

    Returns:
        JSONResponse: Returns Operation Details.
    """

    try:

        items = []
        for item in body:
            items.append({
                "shelf_fk": item.shelf_fk,
                "link": item.link,
                "title": item.title,
                "description": item.description
            })

        # Send request to db to create new items
        item_db = Items()
        result = item_db.create(items=items, db=db)

        return generate_response(**result)

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])
