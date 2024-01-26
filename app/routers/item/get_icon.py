# Built-In Imports
from typing import Optional

# FastAPI Imports
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse, Response

# SQLAlchemy Imports
from sqlalchemy.orm import Session
from sqlalchemy import and_

# Utils
from ...utils.responses import responses, generate_response

# Modules
from app.db.db import get_db
from app.db.model.Items import Items

# Router
router = APIRouter()


@router.get(
    "/icon",
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
        if not item.icon and not item.icon_svg:  # Check if it has icon
            return generate_response(
                status=400,
                title="HTTP 400: Bad Request!",
                description="The item exists, but... it has no icon yet!"
            )

        icon_ext = item.icon_ext.lower() if item.icon_ext else "png"  # Get the extension of the icon
        icon: bytes | str | None = None

        # Get the icon after checking if it exists
        if icon_ext == "svg":
            hex_string = item.icon_svg.replace('\\x', '')  # Delete the start of hex (\x)
            byte_icon = bytes.fromhex(hex_string)  # Convert hex string to bytes
            icon = byte_icon.decode("utf-8")  # Decode the icon from bytes to valid svg
        else:
            icon = item.icon  # Raster Icon

        # Formats to media types
        media_types = {
            "png": "image/png",
            "jpg": "image/jpeg",
            "jpeg": "image/jpeg",
            "gif": "image/gif",
            "svg": "image/svg+xml"
        }

        # Return found icon
        return Response(
            content=icon,
            media_type=media_types.get(icon_ext)  # Define media type using image extension
        )

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])
