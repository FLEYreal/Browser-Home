# FastAPI Imports
from fastapi import APIRouter, Depends, UploadFile
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

# SQLAlchemy Imports
from sqlalchemy import and_
from sqlalchemy.orm import Session

# Libs
from typing import Optional

# Modules
from ..db import get_db
from ..models import Items

# Utils
from ..utils.responses import responses, generate_response
from ..utils.schemas import ItemPostBody

# Define router
router = APIRouter(
    prefix="/item",
    tags=["item"],
    responses=responses
)


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
        list[dict]: A list of dictionaries containing the item(s) data.
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
            items.append(jsonable_encoder(item.__dict__))

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


@router.post("/")
async def item_post(body: ItemPostBody):
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
        dict: Returns Operation Details.
    """

    try:

        pass

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])


@router.post("/icon")
async def item_update_icon_post(file: UploadFile):

    if file:
        file_name = file.filename

        print('FILE NAME: ', file_name)

    return {"test": True}


@router.post("/update")
async def item_update_post():
    """
    Updates item(s) from database table.

    Queries:
        shelf_id (int): Update items of the specified shelf.
    Body: [{
        id: int,
        shelf_id?: int,
        title?: str,
        description?: str
    }]
    Files: icon[]

    Returns:
        dict: Returns Operation Details.
    """
    return {"test": True}


@router.delete("/update")
async def item_update_delete(shelf_id: int):
    """
    Updates item(s) from database table.

    Queries:
        shelf_id (int): Delete items of the specified shelf.
    Body: int[]

    Returns:
        dict: Returns Operation Details.
    """
    return {"test": True}
