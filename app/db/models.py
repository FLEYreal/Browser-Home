# Built-In Imports
from typing import Optional
from datetime import datetime

# SQLAlchemy Imports
from sqlalchemy import String, ForeignKey, LargeBinary, Column, Integer, TIMESTAMP, Text, and_
from sqlalchemy.orm import relationship, Session

# Modules
from app.db.db import Base, get_db


# Tables' Models
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
    def get(cls):
        pass

    @classmethod
    def create(cls):
        pass

    @classmethod
    def update(cls):
        pass

    @classmethod
    def delete(cls):
        pass


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
    def create(cls):
        pass

    @classmethod
    def update(cls):
        pass

    @classmethod
    def update_icon(cls):
        pass

    @classmethod
    def delete(cls):
        pass
