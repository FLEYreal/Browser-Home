# Built-In Imports
from datetime import datetime
from typing import Optional, List

# SQLAlchemy Imports
from sqlalchemy import String, Column, Integer, TIMESTAMP, and_
from sqlalchemy.orm import relationship, Session

# Libs
from pydantic import BaseModel, Field

# Utils
from app.utils.responses import generate_response

# Modules
from app.db.db import Base
from .Items import Items, ItemDeleteModel


class ShelvesDeleteModel(BaseModel):
    shelf_ids: List[int]


class ShelvesUpdateModel(BaseModel):
    item_id: int
    title: Optional[str] = Field(None, min_length=1, max_length=32)
    description: Optional[str] = Field(None, min_length=1, max_length=256)
    color: Optional[str] = Field('#A0A0A0', min_length=1, max_length=7)


class ShelvesModel(BaseModel):
    item_id: Optional[int] = None
    title: str = Field(min_length=1, max_length=32)
    description: str = Field(min_length=1, max_length=256)
    color: Optional[str] = Field('#A0A0A0', min_length=1, max_length=7)
    created_at: Optional[datetime] = None


class Shelves(Base):
    """
    This class represents the shelves table in the database.

    Args:
        shelf_id (int, optional): The primary key of the record.
        title (str): The title of the shelf.
        description (str): The description of the shelf.
        color (str, optional): The color of the shelf.
        created_at (datetime, optional): The date and time the record was created.
    """

    # Name of the table
    __tablename__ = "shelves"

    # Columns
    shelf_id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(32), nullable=False)
    description = Column(String(256), nullable=False)
    color = Column(String(7), default="#A0A0A0")
    created_at = Column(TIMESTAMP, default=datetime.utcnow)

    # Relationships
    items = relationship("Items", back_populates="shelf", uselist=True)

    @classmethod
    def get(cls, db: Session, shelf_id: Optional[int] = None):

        try:

            # If shelf_id is lower than 0
            if shelf_id and shelf_id <= 0:
                return generate_response(
                    is_content=True,
                    status=422,
                    title="HTTP 422: Validation Error!",
                    description="Well, there's no shelf_id lower than 0!"
                )

            # Conditions
            conditions = [
                Shelves.shelf_id == shelf_id if shelf_id else True,
                # ... other conditions might be provided in the future.
            ]

            # Get shelves
            shelves = db.query(Shelves).where(and_(*conditions)).all()

            # Commit changes to the database
            db.commit()

            # Return successful operation
            return generate_response(
                is_content=True,
                status=200,
                title="HTTP 200: OK!",
                description="Here's the shelf(ves) data!",
                payload=shelves
            )

        except Exception as e:

            db.rollback()
            print("Exception: ", e)

            return generate_response(
                is_content=True,
                status=500,
                title="HTTP 500: Internal Server Error!",
                description="Something bad happened to database!"
            )

    @classmethod
    def create(cls, db: Session, shelves: List[ShelvesModel]):

        try:

            for row in shelves:

                # Create new shelf in database
                shelf = cls(**row.model_dump())

                # Insert into database
                db.add(shelf)

            db.commit()

            return generate_response(
                is_content=True,
                status=201,
                title="HTTP 201: Created!",
                description="Successfully Created!"
            )

        except Exception as e:

            db.rollback()
            print("Exception: ", e)

            return generate_response(
                is_content=True,
                status=500,
                title="HTTP 500: Internal Server Error!",
                description="Something bad happened to database!"
            )

    @classmethod
    def update(cls, db: Session, shelves: List[ShelvesUpdateModel]):

        try:

            for row in shelves:

                if hasattr(row, 'created_at'):  # Check if forbidden value attempted to be updated
                    db.rollback()

                    return generate_response(
                        is_content=True,
                        status=422,
                        title="HTTP 422: Unprocessable Entity!",
                        description="You can't update the created_at field!"
                    )

                # Conditions
                conditions = [
                    cls.shelf_id == row.shelf_id,
                    # ... other conditions might be provided in the future.
                ]

                # Get the existing shelf
                shelf = db.query(cls).filter(and_(*conditions)).first()

                # If provided shelf doesn't exist, return error
                if not shelf:
                    return generate_response(
                        is_content=True,
                        status=422,
                        title="HTTP 422: Validation Error!",
                        description="You tried to update what's never existed! May be just creating a new shelf?"
                    )

                for key, value in row.model_dump().items():
                    if value:
                        setattr(shelf, key, value)

            # Commit changes after iterating over each shelf
            db.commit()

            # Return success, rows updated
            return generate_response(
                is_content=True,
                status=200,
                title="HTTP 200: OK!",
                description="Successfully Updated!"
            )

        except Exception as e:

            db.rollback()
            print("Exception: ", e)

            return generate_response(
                is_content=True,
                status=500,
                title="HTTP 500: Internal Server Error!",
                description="Something bad happened to database!"
            )

    @classmethod
    def delete(cls, db: Session, params: ShelvesDeleteModel):

        try:

            for shelf_id in params.shelf_ids:

                # Conditions
                conditions = [
                    cls.shelf_id == shelf_id,
                    # ... other conditions might be provided in the future.
                ]

                # Get the existing shelf
                shelf = db.query(cls).filter(*conditions).first()

                # If provided shelf doesn't exist, return error
                if not shelf:
                    db.rollback()

                    return generate_response(
                        is_content=True,
                        status=422,
                        title="HTTP 422: Unprocessable Entity!",
                        description="You tried to delete what's never existed! May be just creating a new item?"
                    )

                # Get instance of Items table & Delete all items in the shelf
                items_db = Items()
                result = items_db.delete(params=ItemDeleteModel(shelf_fk=shelf_id), db=db)

                # If request is not successful
                if not str(result["status"]).startswith("2"):
                    db.rollback()
                    return generate_response(**result)

                # Delete the item from the database table
                db.delete(shelf)

            # Commit changes after iterating over each shelf
            db.commit()

            return generate_response(
                is_content=True,
                status=200,
                title="HTTP 200: OK!",
                description="Successfully Deleted!"
            )

        except Exception as e:

            db.rollback()
            print("Exception: ", e)

            return generate_response(
                is_content=True,
                status=500,
                title="HTTP 500: Internal Server Error!",
                description="Something bad happened to database!"
            )
