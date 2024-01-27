# Built-In Imports
from typing import Optional, List
from datetime import datetime

# SQLAlchemy Imports
from sqlalchemy import String, ForeignKey, LargeBinary, Column, Integer, TIMESTAMP, Text, and_
from sqlalchemy.orm import relationship, Session

# Libs
from pydantic import BaseModel, Field

# Modules
from app.db.db import Base
from app.utils.responses import generate_response


class ItemDeleteModel(BaseModel):
    shelf_fk: Optional[int] = None
    item_ids: Optional[List[int]] = None


class ItemsUpdateModel(BaseModel):
    item_id: int
    title: Optional[str] = Field(None, min_length=1, max_length=32)
    link: Optional[str] = None
    description: Optional[str] = Field(None, min_length=1, max_length=128)
    icon: Optional[bytes] = None
    icon_svg: Optional[str] = None
    icon_ext: Optional[str] = None,
    shelf_fk: Optional[int] = None


class ItemsModel(BaseModel):
    item_id: Optional[int] = None
    title: str = Field(min_length=1, max_length=32)
    link: str
    description: Optional[str] = Field(None, min_length=1, max_length=128)
    created_at: Optional[datetime] = None
    icon: Optional[bytes] = None
    icon_svg: Optional[str] = None
    icon_ext: Optional[str] = 'png',
    shelf_fk: int


class Items(Base):
    """
    This class represents the items table in the database.

    Args:
        item_id (int, optional): The primary key of the record.
        title (str): The title of the item.
        description (str): The description of the item.
        created_at (datetime, optional): The date and time the record was created.
    """

    # Name of the table
    __tablename__ = 'items'

    # Columns
    item_id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(32), nullable=False)
    link = Column(String, nullable=False)
    description = Column(String(128))
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    icon = Column(LargeBinary)
    icon_svg = Column(Text)
    icon_ext = Column(String, default='png')

    # Relationships
    shelf = relationship("Shelves", back_populates="items", uselist=False)
    shelf_fk = Column(Integer, ForeignKey("shelves.shelf_id"))

    @classmethod
    def get(cls, db: Session, shelf_id: Optional[int] = None, item_id: Optional[int] = None):
        try:
            # Conditions for query
            conditions = [
                cls.item_id == item_id if item_id else True,
                cls.shelf_fk == shelf_id if shelf_id else True,
                # ... other conditions might be provided in the future.
            ]

            # Find all items with or without conditions
            items = db.query(cls).where(and_(*conditions)).all()
            db.commit()

            return generate_response(
                is_content=True,
                payload=items,
                status=200,
                title="HTTP 200: OK!",
                description="Here we go!"
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
    def create(cls, db: Session, items: List[ItemsModel]):

        try:

            for row in items:

                # Insert new item
                item = cls(**row)
                db.add(item)

            # Commit changes to database after creating all items in the list
            db.commit()

            # Return Success Operation
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
    def update(cls, db: Session, items: List[ItemsUpdateModel]):

        try:
            for row in items:

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
                    cls.item_id == row.item_id,
                    # ... other conditions might be provided in the future.
                ]

                # Update values
                item = db.query(cls).filter(*conditions).first()

                # If provided item doesn't exist, return error
                if not item:
                    db.rollback()

                    return generate_response(
                        is_content=True,
                        status=422,
                        title="HTTP 422: Unprocessable Entity!",
                        description="You tried to update what's never existed! May be just creating a new item?"
                    )

                for key, value in row.model_dump().items():
                    if value:
                        setattr(item, key, value)

            # Commit changes after iterating over each item
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
    def delete(cls, db: Session, params: ItemDeleteModel):

        try:

            if params.item_ids:

                # Iterate over each item in the provided VALID list!
                for item_id in params.item_ids:

                    # Conditions
                    conditions = [
                        cls.item_id == item_id,
                        (cls.shelf_fk == params.shelf_fk) if params.shelf_fk else True,
                        # ... other conditions might be provided in the future.
                    ]

                    # Get the existing shelf
                    item = db.query(cls).filter(*conditions).first()

                    # If provided shelf doesn't exist, return error
                    if not item:
                        db.rollback()

                        return generate_response(
                            is_content=True,
                            status=422,
                            title="HTTP 422: Unprocessable Entity!",
                            description="You tried to delete what's never existed! May be just creating a new item?"
                        )

                    # Delete the item from the database table
                    db.delete(item)

            elif params.shelf_fk:

                # Conditions
                conditions = [
                    cls.shelf_fk == params.shelf_fk,
                    # ... other conditions might be provided in the future.
                ]

                items = db.query(cls).filter(*conditions).all()

                if not items:
                    return generate_response(
                        is_content=True,
                        status=422,
                        title="HTTP 422: Unprocessable Entity!",
                        description="Well, such shelf whether doesn't exist or just empty."
                    )

                # Iterate over each item found in the shelf.
                for item in items:
                    db.delete(item)

            else:  # In the case of no item_ids or shelf_fk are provided.
                return generate_response(
                    is_content=True,
                    status=422,
                    title="HTTP 422: Unprocessable Entity!",
                    description="None of the values provided but we'd prefer at least 1 to be."
                )

            # Commit changes after iterating over each shelf
            db.commit()

            # If all deleted successfully, return Success Operation
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
