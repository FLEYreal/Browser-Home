# FastAPI Imports
from fastapi import APIRouter

# Router
router = APIRouter()


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
        JSONResponse: Returns Operation Details.
    """
    pass
