# Imports
from fastapi import APIRouter

# Utils
from ..utils.responses import responses

# Define router
router = APIRouter(
    prefix="/item",
    tags=["item"],
    responses=responses
)


# Endpoints
@router.get("/")
async def item_get(shelf_id: int, item_id: int):
    """
    Get item(s) data in a list of dictionaries.

    Queries:
        shelf_id? (int): The ID of the shelf item belonging to.
        item_id? (int): The ID of the item to get.
    Body: None

    Returns:
        list[dict]: A list of dictionaries containing the item(s) data.
    """
    return {"test": True}


@router.post("/")
async def item_post():
    """
    Insert a list of item(s) data into a database table.

    Queries: None
    Body: [{
        shelf_id: int,
        title: str,
        description: str
    }]
    Files: icon[]

    Returns:
        dict: Returns Operation Details.
    """
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
