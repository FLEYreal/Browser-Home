# Built-In Imports
from typing import Optional, List

# FastAPI Imports
from fastapi import Depends, APIRouter
from fastapi.responses import JSONResponse

# SQLAlchemy Imports
from sqlalchemy.orm import Session

# Libs
from pydantic import BaseModel, Field
import requests
import favicon

# Modules
from app.db.db import get_db
from app.db.model.Items import Items

# Utils
from ...utils.responses import responses, generate_response
from ...utils.icon import mime_types

# Router
router = APIRouter()


class ItemPostBody(BaseModel):
    shelf_fk: int  # Shelf ID item belongs to
    link: str  # Link of the Item
    title: str = Field(min_length=1, max_length=32)  # Title of the Item
    description: Optional[str] = Field(None, min_length=1, max_length=128)  # Description of the Item


@router.post("/")
async def item_post(body: List[ItemPostBody], db: Session = Depends(get_db)):
    """
    Insert a list of item(s) data into a database table.

    Queries: None
    Body: [{
        shelf_id: int
        link: str
        title: str = Field(min_length=1, max_length=32)
        description: Optional[str] = Field(min_length=1, max_length=128)
    }]

    Returns:
        JSONResponse: Returns Operation Details.
    """

    try:

        items = []  # List of item's data
        icons = []  # List of item's icons

        # Convert body to list of dictionaries
        for item in body:

            item_dict = {
                "shelf_fk": item.shelf_fk,
                "link": item.link,
                "title": item.title,
                "description": item.description
            }

            try:
                favicons = favicon.get(item.link)

                # If icons are found
                if favicons and len(favicons) > 0:
                    icon_url = ""  # Icon URL

                    # Try to find icon with ".ico" format
                    ico = list(filter(lambda x: x.format == 'ico', favicons))

                    if ico:  # If icon with ".ico" format is found
                        icon_url = ico[0].url
                    else:  # If not, get the first found icon
                        icon_url = icons[0]

                    # Get Icon & Append to icons list
                    res = requests.get(icon_url)

                    # If icon successfully found
                    if res.status_code == 200:

                        # Get its mime type
                        content_type = res.headers.get('Content-Type')
                        is_allowed = False

                        # Check if mime type is allowed
                        if content_type in mime_types:
                            is_allowed = True

                        # If mime type is allowed, append to icon list
                        if is_allowed:

                            # Save extension in database
                            item_dict["icon_ext"] = mime_types[content_type][0]

                            if content_type == "image/svg+xml":  # If vector type
                                item_dict["icon_svg"] = res.text
                            else:  # If bitmap type
                                item_dict["icon"] = res.content

            except Exception as e:
                print("Unable to find Icon for this website: ", e)

            # Insert data into list of items
            items.append(item_dict)

        item_db = Items()  # Get instance of Items table
        result = item_db.create(items=items, db=db)  # Create provided item(s)

        # If request is not successful
        if not str(result["status"]).startswith("2"):
            return generate_response(**result)

        return generate_response(**result)  # Return Operation Details from database response.

    except Exception as e:

        print("Exception: ", e)
        return JSONResponse(status_code=500, content=responses[500])
