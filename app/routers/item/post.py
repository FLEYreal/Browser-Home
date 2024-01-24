# Built-In Imports
from typing import List

# FastAPI Imports
from fastapi import Depends, APIRouter
from fastapi.responses import JSONResponse

# SQLAlchemy Imports
from sqlalchemy.orm import Session

# Modules
from ...db import get_db
from ...models import Items

# Utils
from ...utils.responses import responses, generate_response
from ...utils.schemas import ItemPostBody

# Router
router = APIRouter()


@router.post("/")
async def item_post(body: List[ItemPostBody], db: Session = Depends(get_db)):
    """
    Insert a list of item(s) data into a database table.

    Queries: None
    Body: [{
        shelf_id: int
        link: str
        title: str = Field(min_length=1, max_length=32)
        description: Optional[str] = Field(min_length=1, max_length=128)
    }]

    Returns:
        JSONResponse: Returns Operation Details.
    """

    try:

        # Iterate over each item in the provided list
        for row in body:

            # Create item object
            item = Items(
                shelf_fk=row.shelf_id,
                link=row.link,
                title=row.title,
                description=row.description
            )

            # Insert new values to "Items" table
            db.add(item)

        # Commit changes to database
        db.commit()

        # Return Operation Details
        return generate_response(
                status=201,
                title="HTTP 201: Created!",
                description="New item(s) successfully created!"
            )

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])
