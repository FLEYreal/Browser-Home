# Built-In Imports
from typing import Optional
from io import BytesIO

# FastAPI Imports
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse, Response

# SQLAlchemy Imports
from sqlalchemy.orm import Session
from sqlalchemy import and_

# Utils
from ...utils.responses import responses, generate_response

# Modules
from ...db import get_db
from ...models import Items

# Router
router = APIRouter()


@router.get(
    "/icon",

    responses={
        200: {
            "content": {"image/png": {}}
        }
    }
)
async def item_icon_get(
        item_id: Optional[int] = None,
        db: Session = Depends(get_db)
):
    """
    Updates item icon from database table.

    Queries:
        item_id (str): Update item icon of the specified item.
    Files: icon

    Returns:
        JSONResponse: Returns Operation Details.
    """

    try:

        # Conditions for query
        conditions = [
            Items.item_id == item_id if item_id else True,
            # ... other conditions might be provided in the future.
        ]

        # Get received item
        item = db.query(Items).where(and_(*conditions)).first()

        if not item:  # Check if exists
            return generate_response(
                status=422,
                title="HTTP 422: Unprocessable entity!",
                description="No item with that ID exists!"
            )
        if not item.icon:  # Check if it has icon
            return generate_response(
                status=400,
                title="HTTP 400: Bad Request!",
                description="The item exists, but... it has no icon yet!"
            )

        # Get the icon after checking if it exists
        icon: bytes = item.icon

        # Return found icon
        return Response(
            content=icon,
            media_type="image/png"
        )

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])
