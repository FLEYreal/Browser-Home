
# FastAPI Imports
from fastapi import UploadFile, APIRouter, Depends
from fastapi.responses import JSONResponse

# SQLAlchemy Imports
from sqlalchemy.orm import Session
from sqlalchemy import and_

# Utils
from ...utils.responses import responses, generate_response
from ...utils.icon import transform_icon, validate_format

# Modules
from app.db.db import get_db
from app.db.model.Items import Items

# Router
router = APIRouter()


@router.post("/icon")
async def item_icon_post(item_id: str, file: UploadFile, db: Session = Depends(get_db)):
    """
    Updates item icon from database table.

    Queries:
        item_id (str): Update item icon of the specified item.
    Files: icon

    Returns:
        JSONResponse: Returns Operation Details.
    """

    try:

        # Validate file extension
        validate_result = validate_format(file)

        # If validation failed
        if not str(validate_result["status"]).startswith("2"):
            return generate_response(**validate_result)

        # Get validation details
        is_allowed = validate_result['details']['is_allowed']
        ext = validate_result['details']['ext']

        # Conditions
        conditions = [
            Items.item_id == item_id
            # ... other conditions might be provided in the future.
        ]

        # Get the existing item
        item = db.query(Items)\
            .filter(and_(*conditions))\
            .first()

        # If provided item doesn't exist, return error
        if not item:
            return generate_response(
                status=422,
                title="HTTP 422: Validation Error!",
                description="You tried to update what's never existed! May be just creating a new item?"
            )

        # Transform icon
        icon_data = await transform_icon(file, ext)

        if not icon_data:
            return JSONResponse(status_code=500, content=responses[500])

        # If icon is bitmap type
        if not ext == 'svg':

            # Update the icon
            item.icon = icon_data
            item.icon_ext = ext

        # If icon is vector type
        else:

            # Insert SVG Icon to db & define extension
            item.icon_svg = icon_data
            item.icon_ext = ext

        # Commit changes to db
        db.commit()

        # Return success
        return generate_response(
            status=200,
            title="HTTP 200: OK!",
            description="Icon successfully updated!"
        )

    except Exception as e:

        print('Exception', e)
        return JSONResponse(status_code=500, content=responses[500])
