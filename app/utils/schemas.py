# Built-In Imports
from typing import List

# Libs
from pydantic import BaseModel


class ShelfDeleteBody(BaseModel):
    shelf_ids: List[int]
