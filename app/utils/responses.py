# Built-in Imports
from typing import List, Optional, Dict

# FastAPI Imports
from fastapi.responses import JSONResponse


def generate_response(
    status: int,
    title: str,
    description: str,
    details: Optional[dict | None] = None,
    payload: Optional[List | None] = None,
    is_content: Optional[bool] = False,
    **response_args
):
    """
    Generate a standardized JSON response. Function is sort of abstraction.
    Using separate function to generate response enables to change
    the structure of the response for the entire application any time.

    Args:
        status (int): HTTP status code
        title (str): Title of the response
        description (str): Description of the response
        details (dict | None, optional): Additional info about the response, mostly FastAPI's generated response for 422 HTTP error.
        payload (List | None, optional): If it's GET Method, payload will contain needed content.
        is_content (bool, optional): Whether to return JSONResponse or just generated content for response.
        response_args (Dict, optional): Contains additional arguments provided to "JSONResponse".

    Returns:
        dict | JSONResponse: JSON response with status, title, and description keys
    """

    content = {
            "status": status,
            "title": title,
            "description": description,
            "details": details,
            "payload": payload
    }

    # Just return content
    if is_content:
        return content

    # Return completed JSONResponseq
    return JSONResponse(
        status_code=status,
        content=content,
        **response_args
    )


# Ready-To-Use standardized responses
responses = {
    404: generate_response(
        status=404,
        title="HTTP 404: Not Found!",
        description="You won't find it here, look elsewhere!",
        is_content=True
    ),

    500: generate_response(
        status=500,
        title="HTTP 500: Internal Server Error!",
        description="Welp... Server is having hard times, please try again later!",
        is_content=True
    )
}
