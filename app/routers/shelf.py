# FastAPI Imports
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

# SQLAlchemy Imports
from sqlalchemy import select
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.orm import Session

# Modules
from ..db import get_db
from ..models import Shelves

# Utils
from ..utils.schemas import ShelfPostBody
from ..utils.responses import responses, generate_response

# Define router
router = APIRouter(
    prefix="/shelf",
    tags=["shelf"],
    responses=responses
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
                    status_code=422,
                    content=generate_response(
                        status=422,
                        title="HTTP 422: Validation Error!",
                        description="Well, there's no shelf_id lower than 0!"
                    )
                )

            # Send request to Shelves table, looking for rows with provided shelf_id
            query = db.execute(
                select(Shelves).where(Shelves.shelf_id == shelf_id)
            )

            # Commit changes to database
            db.commit()

            # Transform result into a list of dictionaries
            transformed_query = map(lambda x: x["Shelves"], query.mappings().all())

            # Append results into response array
            response.extend(transformed_query)

        # Send all shelves if shelf_id is not provided
        else:

            # Send request to Shelves table getting all rows
            query = db.execute(select(Shelves))

            # Commit changes to database
            db.commit()

            # Transform result into a list of dictionaries
            transformed_query = map(lambda x: x["Shelves"], query.mappings().all())

            # Append results into response array
            response.extend(transformed_query)

        # Return found shelves from Shelves table
        return response

    except ValueError:
        return JSONResponse(
            status_code=422,
            content=generate_response(
                status=422,
                title="HTTP 422: Validation Error!",
                description="Hey? What is this shelf_id? Provide me an integer!"
            )
        )

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])


@router.post("/")
async def shelf_post(body: ShelfPostBody, db: Session = Depends(get_db)):
    """
    Inserts new shelf(ves) data into a database table.

    Queries: None
    Body: [{
        title: str = Field(min_length=1, max_length=32)
        description: str = Field(min_length=1, max_length=128)
        color: Optional[str] = Field(None, min_length=1, max_length=7)
    }]

    Returns:
        dict: Returns Operation Details.
    """

    try:

        # If no color provided, setup default color to black
        if not body.color:
            body.color = "#000000"

        # Insert new values to "Shelves" table
        db.execute(
            insert(Shelves).values(
                title=body.title,
                description=body.description,
                color=body.color
            )
        )

        # Commit changes to database
        db.commit()

        # Return Operation Details
        return JSONResponse(
            status_code=201,
            content=generate_response(
                status=201,
                title="HTTP 201: Created!",
                description="New shelf successfully created!"
            )
        )

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])


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
