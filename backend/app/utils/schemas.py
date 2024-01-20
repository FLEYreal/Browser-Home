from pydantic import BaseModel, Field
from typing import Optional


class ShelfPostBody(BaseModel):
    title: str = Field(min_length=1, max_length=32)  # Title of the Shelf
    description: str = Field(min_length=1, max_length=128)  # Description of the Shelf
    color: Optional[str] = Field(None, min_length=1, max_length=7)  # Which color to use for the Shelf
