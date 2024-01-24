# FastAPI Imports
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

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
    responses=responses  # type: ignore
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
                return JSONResponse(
                    status_code=422,
                    content=generate_response(
                        status=422,
                        title="HTTP 422: Validation Error!",
                        description="Well, there's no shelf_id lower than 0!"
                    )
                )

        # Conditions
        conditions = [
            Shelves.shelf_id == shelf_id if shelf_id else True
        ]

        # Send request to Shelves table, looking for rows with provided shelf_id
        shelves = db.execute(
            select(Shelves).where(and_(*conditions))  # type: ignore
        ).mappings().all()

        # Transform result into a list of dictionaries
        transformed_shelves = list(map(lambda x: x["Shelves"], shelves))

        # Return all found shelves
        return transformed_shelves

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
async def shelf_update_post(body: ShelfUpdateBody, db: Session = Depends(get_db)):
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
        dict: Returns Operation Details.
    """

    try:

        # Get the new values from the request body
        shelf_id, title, description, color = body

        # Get a row with same id that's been provided
        shelf = db.execute(select(Shelves).where(Shelves.shelf_id == shelf_id[1])).mappings().all()

        # If provided shelf doesn't exist, return error
        if not shelf:
            return JSONResponse(
                status_code=422,
                content=generate_response(
                    status=422,
                    title="HTTP 422: Validation Error!",
                    description="You tried to update what's never existed! May be just creating a new shelf?"
                )
            )

        if not title[1]:  # No title provided & Set existing
            title = ('title', shelf[0]["Shelves"].title)

        if not description[1]:  # No description provided & Set existing
            description = ('description', shelf[0]["Shelves"].description)

        if not color[1]:  # No color provided & Set existing
            color = ('color', shelf[0]["Shelves"].color)

        # Update the row
        db.execute(
            update(Shelves)
            .where(Shelves.shelf_id == shelf_id[1])
            .values(
                title=title[1],  # Use key value from tuple
                description=description[1],
                color=color[1]
            )
        )

        # Commit changes
        db.commit()

        # Return success, row updated
        return JSONResponse(
            status_code=200,
            content=generate_response(
                status=200,
                title="HTTP 200: OK!",
                description="Shelf successfully updated!"
            )
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
