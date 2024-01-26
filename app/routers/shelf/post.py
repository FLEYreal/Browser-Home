# Built-In Imports
from typing import List

# FastAPI Imports
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

# SQLAlchemy Imports
from sqlalchemy.orm import Session

# Modules
from app.db.db import get_db
from app.db.models import Shelves

# Utils
from ...utils.schemas import ShelfPostBody
from ...utils.responses import responses, generate_response

# Router
router = APIRouter()


@router.post("/")
async def shelf_post(body: List[ShelfPostBody], db: Session = Depends(get_db)):
    """
    Inserts new shelf(ves) data into a database table.

    Queries: None
    Body: [{
        title: str = Field(min_length=1, max_length=32)
        description: str = Field(min_length=1, max_length=128)
        color: Optional[str] = Field(None, min_length=1, max_length=7)
    }]

    Returns:
        JSONResponse: Returns Operation Details.
    """

    try:

        # Iterate over each shelf in the provided list
        for item in body:

            # Create shelf object
            shelf = Shelves(
                title=item.title,
                description=item.description,
                color=item.color
            )

            # Insert new values to "Shelves" table
            db.add(shelf)

        # Commit changes to database
        db.commit()

        # Return Operation Details
        return generate_response(
                status=201,
                title="HTTP 201: Created!",
                description="New shelf(ves) successfully created!"
            )

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])
