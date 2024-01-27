# Built-In Imports
from typing import Optional, List

# FastAPI Imports
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse

# SQLAlchemy Imports
from sqlalchemy.orm import Session

# Libs
from pydantic import BaseModel

# Modules
from app.db.db import get_db
from app.db.model.Items import Items

# Utils
from app.utils.responses import generate_response, responses

# Router
router = APIRouter()


class ItemDeleteBody(BaseModel):
    shelf_fk: Optional[int] = None
    item_ids: Optional[List[int]] = None


@router.delete("/update")
async def item_update_delete(body: ItemDeleteBody, db: Session = Depends(get_db)):
    """
    Delete item(s) from database table.

    Queries: None
    Body: {
        shelf_fk: Optional[int] = None
        item_ids: Optional[List[int]] = None
    }

    Returns:
        JSONResponse: Returns Operation Details.
    """

    try:

        items_db = Items()  # Get instance of Items table
        result = items_db.delete(params=body, db=db)  # Delete by provided params

        return generate_response(**result)  # Return Operation Details from database response.

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])
