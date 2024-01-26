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


class ItemsModel(BaseModel):
    item_id: Optional[int] = None
    title: str = Field(min_length=1, max_length=32)
    link: str
    description: Optional[str] = Field(None, min_length=1, max_length=128)
    created_at: datetime
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
            items = db.query(Items).where(and_(*conditions)).all()
            db.commit()

            return {
                "details": {
                    "code": 200
                },
                "payload": items
            }

        except Exception as e:

            db.rollback()

            return {
                "details": {
                    "code": 500,
                    "exception": str(e)
                },
                "payload": None
            }

    @classmethod
    def get_icon(cls):
        pass

    @classmethod
    def create(cls, db: Session, items: List[ItemsModel]):

        try:

            for row in items:

                # Insert new item
                item = Items(**row)
                db.add(item)

            # Commit changes to database after creating all items in the list
            db.commit()

            # Return Success Operation
            return {
                "details": {
                    "code": 201
                },
                "payload": None
            }

        except Exception as e:

            db.rollback()

            return {
                "details": {
                    "code": 500,
                    "exception": str(e)
                },
                "payload": None
            }

    @classmethod
    def update(cls):
        pass

    @classmethod
    def update_icon(cls):
        pass

    @classmethod
    def delete(cls):
        pass
