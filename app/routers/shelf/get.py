# FastAPI Imports
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

# SQLAlchemy Imports
from sqlalchemy import and_
from sqlalchemy.orm import Session

# Modules
from ...db import get_db
from ...models import Shelves

# Utils
from ...utils.responses import responses, generate_response
from ...utils.schemas import ShelfGetResponse

# Router
router = APIRouter()


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

            # Send only allowed fields to client
            shelf_dict: ShelfGetResponse = {
                "shelf_id": shelf.shelf_id,
                "title": shelf.title,
                "description": shelf.description,
                "color": shelf.color,
                "created_at": shelf.created_at
            }
            shelves.append(jsonable_encoder(shelf_dict))

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
