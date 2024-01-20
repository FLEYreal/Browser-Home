def generate_response(
    status: int,
    title: str,
    description: str,
    details: dict | None = None
):
    """
    Generate a standardized JSON response. Function is sort of abstraction.
    Using separate function to generate response enables to change
    the structure of the response for the entire application any time.

    Args:
        status (int): HTTP status code
        title (str): Title of the response
        description (str): Description of the response
        details (dict | None, optional): Additional info about the response.

    Returns:
        dict: JSON response with status, title, and description keys
    """

    return {
        "status": status,
        "title": title,
        "description": description,
        "details": details
    }


# Ready-To-Use standardized responses
responses = {
    404: generate_response(
        status=404,
        title="HTTP 404: Not Found!",
        description="You won't find it here, look elsewhere!"
    ),

    500: generate_response(
        status=500,
        title="HTTP 500: Internal Server Error!",
        description="Welp... Server is having hard times, please try again later!"
    )
}
