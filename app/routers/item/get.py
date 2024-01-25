# Built-In Imports
from typing import Optional

# FastAPI Imports
from fastapi import Depends, APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

# SQLAlchemy Imports
from sqlalchemy import and_
from sqlalchemy.orm import Session

# Modules
from ...db import get_db
from ...models import Items

# Utils
from ...utils.responses import responses, generate_response
from ...utils.schemas import ItemGetResponse

# Router
router = APIRouter()


# Endpoints
@router.get("/")
async def item_get(shelf_id: Optional[int] = None, item_id: Optional[int] = None, db: Session = Depends(get_db)):
    """
    Get item(s) data in a list of dictionaries.

    Queries:
        shelf_id? (int): The ID of the shelf item belonging to.
        item_id? (int): The ID of the item to get.
    Body: None

    Returns:
        JSONResponse: A list of dictionaries containing the item(s) data (except for icon, there's another route for it)
    """

    try:

        # Conditions for query
        conditions = [
            Items.item_id == item_id if item_id else True,
            Items.shelf_fk == shelf_id if shelf_id else True,
            # ... other conditions might be provided in the future.
        ]

        # Find all items with or without conditions
        items = []
        for item in db.query(Items).where(and_(*conditions)).all():

            # Send only allowed fields to client
            item_dict: ItemGetResponse = {
                "item_id": item.item_id,
                "title": item.title,
                "description": item.description,
                "created_at": item.created_at,
                "shelf_fk": item.shelf_fk
            }
            items.append(jsonable_encoder(item_dict))

        # Return all found items
        return generate_response(
            status=200,
            title="HTTP 200: OK!",
            description="Here's the list items data!",
            payload=items
        )

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])

