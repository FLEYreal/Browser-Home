# FastAPI Imports
from fastapi import UploadFile, APIRouter

# Router
router = APIRouter()


@router.post("/icon")
async def item_update_icon_post(item_id: str, file: UploadFile):
    """
    Updates item icon from database table.

    Queries:
        item_id (str): Update item icon of the specified item.
    Files: icon

    Returns:
        JSONResponse: Returns Operation Details.
    """
    pass
