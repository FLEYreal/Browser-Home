# Built-In Imports
from datetime import datetime

# SQLAlchemy Imports
from sqlalchemy import String, Column, Integer, TIMESTAMP
from sqlalchemy.orm import relationship

# Modules
from app.db.db import Base


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
