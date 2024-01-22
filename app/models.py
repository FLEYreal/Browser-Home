# Imports
from sqlalchemy import String, ForeignKey, LargeBinary, Column, Integer, TIMESTAMP
from sqlalchemy.orm import relationship
from datetime import datetime

# Modules
from .db import Base


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

    # Relationships
    shelf = relationship("Shelves", back_populates="items", uselist=False)
    shelf_fk = Column(Integer, ForeignKey("shelves.shelf_id"))
