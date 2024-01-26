# Built-In Imports
from datetime import datetime
from typing import Optional, TypedDict

# FastAPI Imports
from fastapi.encoders import jsonable_encoder
from fastapi import Depends, APIRouter, HTTPException, Query
from fastapi.responses import JSONResponse

# SQLAlchemy Imports
from sqlalchemy.orm import Session

# Libs
from pydantic import BaseModel, ValidationError

# Modules
from app.db.db import get_db
from app.db.model.Items import Items

# Utils
from ...utils.responses import responses, generate_response

# Router
router = APIRouter()


# Schemas
class ItemGetParams(BaseModel):  # Queries endpoint accepts
    shelf_id: Optional[int] = Query(None, description="shelf's ID")
    item_id: Optional[int] = Query(None, description="item's ID")


class ItemGetResponse(TypedDict):  # List of allowed fields from db
    item_id: int
    title: str
    description: Optional[str]
    created_at: datetime
    shelf_fk: int


# Endpoints
@router.get("/")
async def item_get(
        queries: ItemGetParams = Depends(),
        db: Session = Depends(get_db)
):
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

        # Get queries from params
        queries_dict = {
            "shelf_id": queries.shelf_id if queries and queries.shelf_id else None,
            "item_id": queries.item_id if queries and queries.item_id else None
        }

        # Send request to db to get items
        items_db = Items()
        result = items_db.get(
            db=db,
            **queries_dict,
        )

        if result["details"]["code"] == 500:  # If Database returned exception
            raise HTTPException(
                status_code=result["details"]["code"],
                detail=result["details"]["exception"]
            )

        items = []
        for item in result["payload"]:

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
            details=result["details"],
            payload=result["payload"]
        )

    except ValidationError as e:

        return generate_response(
            status=422,
            title="HTTP 422: Unprocessable Entity!",
            description="You've sent invalid data!",
            details=e.errors()
        )

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])

