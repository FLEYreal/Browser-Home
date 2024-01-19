# Imports
from fastapi import APIRouter

# Define router
router = APIRouter(
    prefix="/shelf",
    tags=["shelf"],

    responses={

        404: {
            "status": 404,
            "title": "HTTP 404: Not Found!",
            "description": "You won't find it here, look elsewhere!"
        }

    }

)


# Endpoints
@router.get("/")
async def shelf_get(shelf_id: int):
    """
    Provides a list of dictionaries containing the shelf data.

    Queries:
        - shelf_id? (int): The ID of the shelf to get.
    Body: None

    Returns:
        list[dict]: A list of dictionaries containing the shelf data.
    """

    return {"test": True}


@router.post("/")
async def shelf_post():
    """
    Inserts new shelf(ves) data into a database table.

    Queries: None
    Body: [{
        title: str,
        description: str,
        color?: str
    }]

    Returns:
        dict: Returns Operation Details.
    """
    return {"test": True}


@router.post("/update")
async def shelf_update_post():
    """
    Updates a shelf(ves) data in a database table.

    Queries: None
    Body: [{
        id: int,
        title?: str,
        description?: str,
        color?: str
    ]}

    Returns:
        dict: Returns Operation Details.
    """
    return {"test": True}


@router.delete("/update")
async def shelf_update_delete():
    """
    Deletes a shelf(ves) data in a database table.

    Queries: None
    Body: int[]

    Returns:
        dict: Returns Operation Details.
    """
    return {"test": True}