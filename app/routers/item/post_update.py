# Built-In Imports
from typing import List, Optional

# FastAPI Imports
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse

# SQLAlchemy Imports
from sqlalchemy.orm import Session

# Libs
from pydantic import BaseModel, Field

# Utils
from ...utils.responses import generate_response, responses

# Modules
from app.db.db import get_db
from app.db.model.Items import Items

# Router
router = APIRouter()


class ItemUpdateBody(BaseModel):
    item_id: int
    shelf_fk: Optional[int] = None
    link: Optional[str] = None  # New Link of the Item
    title: Optional[str] = Field(None, min_length=1, max_length=32)  # New Title for the Item
    description: Optional[str] = Field(None, min_length=1, max_length=128)  # New Description for the Item


@router.post("/update")
async def item_update_post(body: List[ItemUpdateBody], db: Session = Depends(get_db)):
    """
    Updates item(s) from database table.

    Queries:
        shelf_id (int): Update items of the specified shelf.
    Body: [{
        shelf_id: int
        link: Optional[str] = None
        title: Optional[str] = Field(None, min_length=1, max_length=32)
        description: Optional[str] = Field(None, min_length=1, max_length=128)
    }]
    Files: icon[]

    Returns:
        JSONResponse: Returns Operation Details.
    """

    try:

        items_db = Items()  # Get instance of Items table
        result = items_db.update(items=[*body], db=db)  # Update items with provided values

        return generate_response(**result)  # Return Operation Details from database response.

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])
