# Built-In Imports
from typing import List

# FastAPI Imports
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

# SQLAlchemy Imports
from sqlalchemy import and_
from sqlalchemy.orm import Session

# Modules
from ...db import get_db
from ...models import Shelves

# Utils
from ...utils.schemas import ShelfUpdateBody
from ...utils.responses import responses, generate_response

# Router
router = APIRouter()


@router.post("/update")
async def shelf_update_post(body: List[ShelfUpdateBody], db: Session = Depends(get_db)):
    """
    Updates a shelf(ves) data in a database table.

    Queries: None
    Body: [{
        shelf_id: int
        title: Optional[str] = Field(None, min_length=1, max_length=32)
        description: Optional[str] = Field(None, min_length=1, max_length=256)
        color: Optional[str] = Field('#A0A0A0', min_length=1, max_length=7)
    ]}

    Returns:
        JSONResponse: Returns Operation Details.
    """

    try:

        # Iterate over each shelf in the provided list
        for row in body:

            # Conditions
            conditions = [
                Shelves.shelf_id == row.shelf_id,
                # ... other conditions might be provided in the future.
            ]

            # Get the existing shelf
            shelf = db.query(Shelves)\
                .filter(and_(*conditions))\
                .first()

            # If provided shelf doesn't exist, return error
            if not shelf:
                return generate_response(
                        status=422,
                        title="HTTP 422: Validation Error!",
                        description="You tried to update what's never existed! May be just creating a new shelf?"
                    )

            # Update the shelf
            # Checks if value's provided and updates it if it is
            shelf.title = row.title if row.title else shelf.title
            shelf.description = row.description if row.description else shelf.description
            shelf.color = row.color if row.color else shelf.color

        # Commit changes after iterating over each shelf
        db.commit()

        # Return success, row updated
        return generate_response(
                status=200,
                title="HTTP 200: OK!",
                description="Shelf(ves) successfully updated!"
            )

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])
