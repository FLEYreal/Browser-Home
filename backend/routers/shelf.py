# FastAPI Imports
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy import select

# SQLAlchemy Imports
from sqlalchemy.orm import Session

# Modules
from db import get_db
from models import Shelves

# Define router
router = APIRouter(
    prefix="/shelf",
    tags=["shelf"],

    responses={

        404: {
            "status": 404,
            "title": "HTTP 404: Not Found!",
            "description": "You won't find it here, look elsewhere!"
        }

    }

)


# Endpoints
@router.get("/")
async def shelf_get(shelf_id: str = None, db: Session = Depends(get_db)):
    """
    Provides a list of dictionaries containing the shelf data.

    Queries:
        - shelf_id? (int): The ID of the shelf to get.
    Body: None

    Returns:
        list[dict]: A list of dictionaries containing the shelf data.
    """

    try:

        # Response to send back to client
        response = []

        # If shelf_id is provided
        if shelf_id:
            shelf_id = int(shelf_id)

            # If shelf_id is lower than 0
            if shelf_id <= 0:
                return JSONResponse(
                    status_code=400,
                    content={
                        "status": 400,
                        "title": "HTTP 400: Bad Request!",
                        "description": "Well, there's no shelf_id lower than 0!"
                    }
                )

            # Send request to Shelves table, looking for rows with provided shelf_id
            query = db.execute(
                select(Shelves).where(Shelves.shelf_id == shelf_id)
            )

            # Transform result into a list of dictionaries
            transformed_query = map(lambda x: x["Shelves"], query.mappings().all())

            # Append results into response array
            response.extend(transformed_query)

        # Send all shelves if shelf_id is not provided
        else:

            # Send request to Shelves table getting all rows
            query = db.execute(select(Shelves))

            # Transform result into a list of dictionaries
            transformed_query = map(lambda x: x["Shelves"], query.mappings().all())

            # Append results into response array
            response.extend(transformed_query)

        # Return found shelves from Shelves table
        return response

    except ValueError:
        return JSONResponse(
            status_code=400,
            content={
                "status": 400,
                "title": "HTTP 400: Bad Request!",
                "description": "Hey? What is this shelf_id? Provide me an integer!"
            }
        )

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(
            status_code=500,
            content={
                "status": 500,
                "title": "HTTP 500: Internal Server Error!",
                "description": "Welp... Server is having hard times, please try again later!"
            }
        )


@router.post("/")
async def shelf_post():
    """
    Inserts new shelf(ves) data into a database table.

    Queries: None
    Body: [{
        title: str,
        description: str,
        color?: str
    }]

    Returns:
        dict: Returns Operation Details.
    """
    return {"test": True}


@router.post("/update")
async def shelf_update_post():
    """
    Updates a shelf(ves) data in a database table.

    Queries: None
    Body: [{
        id: int,
        title?: str,
        description?: str,
        color?: str
    ]}

    Returns:
        dict: Returns Operation Details.
    """
    return {"test": True}


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
