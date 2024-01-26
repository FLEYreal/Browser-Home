# Built-In Imports

# FastAPI Imports
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

# SQLAlchemy Imports
from sqlalchemy.orm import Session

# Modules
from app.db.db import get_db
from app.db.models import Items

# Utils
from app.utils.responses import generate_response, responses
from app.utils.schemas import ItemDeleteBody

# Router
router = APIRouter()


@router.delete("/update")
async def item_update_delete(body: ItemDeleteBody, db: Session = Depends(get_db)):
    """
    Updates item(s) from database table.

    Queries: None
    Body: int[]

    Returns:
        JSONResponse: Returns Operation Details.
    """

    try:

        if body.item_ids:

            # Iterate over each item in the provided VALID list!
            for item_id in body.item_ids:

                # Conditions
                conditions = [
                    Items.item_id == item_id,
                    (Items.shelf_fk == body.shelf_fk) if body.shelf_fk else True,
                    # ... other conditions might be provided in the future.
                ]

                # Get the existing shelf
                item = db.query(Items).filter(*conditions).first()

                # If provided shelf doesn't exist, return error
                if not item:
                    return generate_response(
                        status=422,
                        title="HTTP 422: Validation Error!",
                        description="It's a mistake! One (or more?) of the items in the list doesn't exist!"
                    )

                # Delete the item from the database table
                db.delete(item)

        elif body.shelf_fk:

            # Conditions
            conditions = [
                Items.shelf_fk == body.shelf_fk,
                # ... other conditions might be provided in the future.
            ]

            items = db.query(Items).filter(*conditions).all()

            if not items:
                return generate_response(
                    status=422,
                    title="HTTP 422: Validation Error!",
                    description="Well, such shelf whether doesn't exist or just empty."
                )

            # Iterate over each item found in the shelf.
            for item in items:
                db.delete(item)

        else:  # In the case of no item_ids or shelf_fk are provided.
            return generate_response(
                status=422,
                title="HTTP 422: Validation Error!",
                description="None of the values provided but we'd prefer at least 1 to be."
            )

        # Commit changes after iterating over each shelf
        db.commit()

        # Return success, rows deleted
        return generate_response(
            status=200,
            title="HTTP 200: OK!",
            description="Item(s) successfully deleted!"
        )

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])
