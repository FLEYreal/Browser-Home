# FastAPI Imports
from fastapi import APIRouter

# Router
router = APIRouter()


@router.delete("/update")
async def item_update_delete(shelf_id: int):
    """
    Updates item(s) from database table.

    Queries:
        shelf_id (int): Delete items of the specified shelf.
    Body: int[]

    Returns:
        JSONResponse: Returns Operation Details.
    """
    pass
