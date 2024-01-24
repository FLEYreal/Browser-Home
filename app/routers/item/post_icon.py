# FastAPI Imports
from fastapi import UploadFile, APIRouter
from fastapi.responses import JSONResponse

# Utils
from ...utils.responses import responses, generate_response

# Router
router = APIRouter()


@router.post("/icon")
async def item_update_icon_post(item_id: str, file: UploadFile):
    """
    Updates item icon from database table.

    Queries:
        item_id (str): Update item icon of the specified item.
    Files: icon

    Returns:
        JSONResponse: Returns Operation Details.
    """

    try:

        # Icon related vars
        name = file.filename
        icon = await file.read()

        # Extension related vars
        allowed_extensions = ['png', 'jpg', 'jpeg', 'svg']
        is_allowed = False

        # Check if file extension is allowed
        for ext in range(len(allowed_extensions)):

            # If provided extension is allowed, break the loop
            if allowed_extensions[ext] == name.split('.')[-1]:
                is_allowed = True
                break

        # If extension is not allowed, return error
        if not is_allowed:
            return generate_response(
                status=400,
                title="HTTP 400: Bad Request!",
                description="Invalid file extension!",
                details={
                    "allowed_extensions": allowed_extensions
                }
            )

        return generate_response(
            status=200,
            title="HTTP 200: OK!",
            description="Icon successfully updated!"
        )

    except Exception as e:

        print('Exception', e)
        return JSONResponse(status_code=500, content=responses[500])
