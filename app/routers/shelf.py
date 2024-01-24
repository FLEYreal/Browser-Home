# Built-In Imports
from typing import List

# FastAPI Imports
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

# SQLAlchemy Imports
from sqlalchemy import select, update, and_
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.orm import Session

# Modules
from ..db import get_db
from ..models import Shelves

# Utils
from ..utils.schemas import ShelfPostBody, ShelfUpdateBody
from ..utils.responses import responses, generate_response

# Define router
router = APIRouter(
    prefix="/shelf",
    tags=["shelf"],
    responses=responses
)


# Endpoints
@router.get("/")
async def shelf_get(shelf_id: str = None, db: Session = Depends(get_db)):  # type: ignore
    """
    Provides a list of dictionaries containing the shelf data.

    Queries:
        - shelf_id? (int): The ID of the shelf to get.
    Body: None

    Returns:
        JSONResponse: A list of dictionaries containing the shelf data.
    """

    try:

        # Transform to int if provided
        if shelf_id:
            shelf_id = int(shelf_id)

            # If shelf_id is lower than 0
            if shelf_id <= 0:
                return generate_response(
                        status=422,
                        title="HTTP 422: Validation Error!",
                        description="Well, there's no shelf_id lower than 0!"
                )

        # Conditions
        conditions = [
            Shelves.shelf_id == shelf_id if shelf_id else True,
            # ... other conditions might be provided in the future.
        ]

        # Find all the shelves and append result into "shelves" list
        shelves = []
        for shelf in db.query(Shelves).where(and_(*conditions)).all():
            shelves.append(jsonable_encoder(shelf.__dict__))

        # Return all found shelves
        return generate_response(
            status=200,
            title="HTTP 200: OK!",
            description="Here's the shelf(ves) data!",
            payload=shelves
        )

    except ValueError:
        return generate_response(
                status=422,
                title="HTTP 422: Validation Error!",
                description="Hey? What is this shelf_id? Provide me an integer!"
            )

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])


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
                description="New shelf successfully created!"
            )

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])


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
                description="Shelf successfully updated!"
            )

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])


@router.delete("/update")
async def shelf_update_delete():
    """
    Deletes a shelf(ves) data in a database table.

    Queries: None
    Body: int[]

    Returns:
        dict: Returns Operation Details.
    """
    return {"test": True}
