# FastAPI Imports
from fastapi import FastAPI

# Variables
app = FastAPI()


# Routes
@app.get("/shelf")
async def shelf_get(shelf_id: int):
    """
    Provides a list of dictionaries containing the shelf data.

    Queries:
        - shelf_id? (int): The ID of the shelf to get.
    Body: None

    Returns:
        list[dict]: A list of dictionaries containing the shelf data.
    """
    pass


@app.post("/shelf")
async def shelf_post():
    """
    Inserts new shelf(ves) data into a database table.

    Queries: None
    Body: [{
        title: str,
        description: str,
        color?: str
    }]

    Returns:
        dict: Returns Operation Details.
    """
    pass


@app.get("/item")
async def item_get(shelf_id: int, item_id: int):
    """
    Get item(s) data in a list of dictionaries.

    Queries:
        shelf_id? (int): The ID of the shelf item belonging to.
        item_id? (int): The ID of the item to get.
    Body: None

    Returns:
        list[dict]: A list of dictionaries containing the item(s) data.
    """
    pass


@app.post("/item")
async def item_post():
    """
    Insert a list of item(s) data into a database table.

    Queries: None
    Body: [{
        shelf_id: int,
        title: str,
        description: str
    }]
    Files: icon[]

    Returns:
        dict: Returns Operation Details.
    """
    pass


@app.post("shelf/update")
async def shelf_update_post():
    """
    Updates a shelf(ves) data in a database table.

    Queries: None
    Body: [{
        id: int,
        title?: str,
        description?: str,
        color?: str
    ]}

    Returns:
        dict: Returns Operation Details.
    """
    pass


@app.delete("shelf/update")
async def shelf_update_delete():
    """
    Deletes a shelf(ves) data in a database table.

    Queries: None
    Body: int[]

    Returns:
        dict: Returns Operation Details.
    """
    pass


@app.post("item/update")
async def item_update_post():
    """
    Updates item(s) from database table.

    Queries:
        shelf_id (int): Update items of the specified shelf.
    Body: [{
        id: int,
        shelf_id?: int,
        title?: str,
        description?: str
    }]
    Files: icon[]

    Returns:
        dict: Returns Operation Details.
    """
    pass


@app.delete("item/update")
async def item_update_delete(shelf_id: int):
    """
    Updates item(s) from database table.

    Queries:
        shelf_id (int): Delete items of the specified shelf.
    Body: int[]

    Returns:
        dict: Returns Operation Details.
    """
    pass
