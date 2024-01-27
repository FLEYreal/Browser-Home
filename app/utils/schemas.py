# Built-In Imports
from datetime import datetime
from typing import Optional, TypedDict, List

# Libs
from pydantic import BaseModel, Field


# REQUEST BODY SCHEMAS
class ShelfPostBody(BaseModel):
    title: str = Field(min_length=1, max_length=32)  # Title of the Shelf
    description: str = Field(min_length=1, max_length=256)  # Description of the Shelf
    color: Optional[str] = Field('#A0A0A0', min_length=1, max_length=7)  # Which color to use for the Shelf


class ShelfUpdateBody(BaseModel):
    shelf_id: int
    title: Optional[str] = Field(None, min_length=1, max_length=32)  # New Title for the Shelf
    description: Optional[str] = Field(None, min_length=1, max_length=256)  # New Description for the Shelf
    color: Optional[str] = Field(None, min_length=1, max_length=7)  # New Color for the Shelf


class ShelfDeleteBody(BaseModel):
    shelf_ids: List[int]


# RESPONSE SCHEMA
class ShelfGetResponse(TypedDict):  # List of allowed fields from db
    shelf_id: int
    title: str
    description: str
    color: str
    created_at: datetime
