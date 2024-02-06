# FastAPI Imports
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse, Response

# SQLAlchemy Imports
from sqlalchemy.orm import Session

# Utils
from ...utils.responses import responses, generate_response
from ...utils.icon import media_types

# Modules
from app.db.db import get_db
from app.db.model.Items import Items

# Router
router = APIRouter()


@router.get(
    "/icon",
)
async def item_icon_get(
        item_id: int,
        db: Session = Depends(get_db)
):
    """
    Updates item icon from database table.

    Queries:
        item_id (str): Update item icon of the specified item.
    Files: icon
    """

    try:

        items_db = Items()  # Get instance of Items table
        result = items_db.get(item_id=item_id, db=db)  # Get by provided id

        # If request is not successful
        if not str(result["status"]).startswith("2"):
            return generate_response(**result)

        item = result["payload"][0] if result["payload"] and result["payload"][0] else None

        if not item:  # Check if exists
            return generate_response(
                status=404,
                title="HTTP 404: Not Found!",
                description="No item with that ID exists!",
                headers={"content-type": "application/json"}
            )

        if not item.icon and not item.icon_svg:  # Check if it has icon
            return Response(
                content="",
                status_code=204,
                headers={"content-type": "application/json"}
            )

        # Get the extension of the icon
        icon_ext = item.icon_ext.lower() if item.icon_ext else "png"
        icon: bytes | str | None = None

        # Get the icon after checking if it exists
        if icon_ext == "svg":
            hex_string = item.icon_svg.replace(
                '\\x', '')  # Delete the start of hex (\x)
            # Convert hex string to bytes
            byte_icon = bytes.fromhex(hex_string)
            # Decode the icon from bytes to valid svg
            icon = byte_icon.decode("utf-8")
        else:
            icon = item.icon  # Raster Icon

        # Return found icon
        return Response(
            content=icon,
            # Define media type using image extension
            media_type=media_types.get(icon_ext)
        )

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])
