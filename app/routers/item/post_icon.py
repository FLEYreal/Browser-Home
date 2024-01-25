# Built-In Imports
from io import BytesIO

# FastAPI Imports
from fastapi import UploadFile, APIRouter, Depends
from fastapi.responses import JSONResponse

# SQLAlchemy Imports
from sqlalchemy.orm import Session
from sqlalchemy import and_

# Libs
from PIL import Image

# Utils
from ...utils.responses import responses, generate_response

# Modules
from ...db import get_db
from ...models import Items

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

        # File vars
        name = file.filename
        ext = name.split('.')[-1]

        # Extension related vars
        allowed_extensions = ['png', 'jpg', 'jpeg', 'gif', 'svg']
        pillow_format = {'png': 'PNG', 'jpg': 'JPEG', 'jpeg': 'JPEG', 'gif': 'GIF'}
        is_allowed = False

        # Check if file extension is allowed
        for allowed in range(len(allowed_extensions)):

            # If provided extension is allowed, break the loop
            if allowed_extensions[allowed] == ext:
                is_allowed = True
                break

        # If extension is not allowed, return error
        if not is_allowed:
            return generate_response(
                status=400,
                title="HTTP 400: Bad Request!",
                description="Invalid file extension!",
                details={
                    "allowed_extensions": allowed_extensions
                }
            )

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

        if not ext == 'svg':

            # Get Icon
            icon = Image.open(BytesIO(file.file.read()))

            # Transform image to bytes
            icon_bytes = BytesIO()
            icon.save(icon_bytes, format=pillow_format[ext])
            icon_data = icon_bytes.getvalue()

            # Update the icon
            item.icon = icon_data
            item.icon_ext = ext

        else:

            # Get SVG Icon
            svg_icon = await file.read()
            print(svg_icon)

            # Insert SVG Icon to db & define extension
            item.icon_svg = svg_icon
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
