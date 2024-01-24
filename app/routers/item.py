# FastAPI Imports
from fastapi import APIRouter, Depends, UploadFile
from fastapi.responses import JSONResponse

# SQLAlchemy Imports
from sqlalchemy import select, and_
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.orm import Session

# Libs
from typing import Optional

# Modules
from ..db import get_db
from ..models import Items

# Utils
from ..utils.responses import responses
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
        ]

        # Find all items with or without conditions
        items = db.execute(
            select(Items)
            .where(and_(*conditions))
        ).mappings().all()

        # Transform result into a list of dictionaries
        transformed_query = list(map(lambda x: x["Items"], items))

        # Return all found items
        return transformed_query

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
