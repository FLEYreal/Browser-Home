# FastAPI Imports
from datetime import datetime
from typing import TypedDict

# FastAPI Imports
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

# SQLAlchemy Imports
from sqlalchemy.orm import Session

# Modules
from app.db.db import get_db
from app.db.model.Shelves import Shelves

# Utils
from ...utils.responses import responses, generate_response

# Router
router = APIRouter()


class ShelfGetResponse(TypedDict):  # List of allowed fields from db
    shelf_id: int
    title: str
    description: str
    color: str
    created_at: datetime


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

        # Send request to db to get shelves
        shelves_db = Shelves()
        result = shelves_db.get(db, int(shelf_id) if shelf_id else None)

        # If request is not successful
        if not str(result["status"]).startswith("2"):
            return generate_response(**result)

        # Find all the shelves and append result into "shelves" list
        shelves = []
        for shelf in result["payload"]:

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
