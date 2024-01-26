# Built-In Imports
from typing import List

# FastAPI Imports
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

# SQLAlchemy Imports
from sqlalchemy.orm import Session

# Utils
from ...utils.schemas import ItemUpdateBody
from ...utils.responses import generate_response, responses

# Modules
from app.db.db import get_db
from app.db.model.Items import Items

# Router
router = APIRouter()


@router.post("/update")
async def item_update_post(body: List[ItemUpdateBody], db: Session = Depends(get_db)):
    """
    Updates item(s) from database table.

    Queries:
        shelf_id (int): Update items of the specified shelf.
    Body: [{
        shelf_id: int
        link: Optional[str] = None
        title: Optional[str] = Field(None, min_length=1, max_length=32)
        description: Optional[str] = Field(None, min_length=1, max_length=128)
    }]
    Files: icon[]

    Returns:
        JSONResponse: Returns Operation Details.
    """

    try:
        for row in body:

            # Conditions
            conditions = [
                Items.item_id == row.item_id,
                # ... other conditions might be provided in the future.
            ]

            # Update values
            item = db.query(Items).filter(*conditions).first()

            # If provided item doesn't exist, return error
            if not item:
                return generate_response(
                    status=422,
                    title="HTTP 422: Validation Error!",
                    description="You tried to update what's never existed! May be just creating a new item?"
                )

            # Update values that are provided
            item.shelf_fk = row.shelf_fk if row.shelf_fk else item.shelf_fk
            item.link = row.link if row.link else item.link
            item.title = row.title if row.title else item.title
            item.description = row.description if row.description else item.description

        # Commit changes after iterating over each shelf
        db.commit()

        # Return success, row updated
        return generate_response(
            status=200,
            title="HTTP 200: OK!",
            description="Item(s) successfully updated!"
        )

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])
