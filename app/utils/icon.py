# Built-In Imports
from io import BytesIO

# FastAPI Imports
from fastapi import UploadFile

# Libs
from PIL import Image

# Utils
from .responses import generate_response

# Variables
allowed_extensions = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'ico']
pillow_format = {'png': 'PNG', 'jpg': 'JPEG', 'jpeg': 'JPEG', 'gif': 'GIF', "ico": "ICO"}


def validate_format(icon: UploadFile):

    try:

        # File vars
        name = icon.filename
        ext = name.split('.')[-1]

        # Is provided icon's extension supported
        is_allowed = False

        # Check if file extension is allowed
        for allowed in range(len(allowed_extensions)):

            # If provided extension is allowed, break the loop
            if allowed_extensions[allowed] == ext:
                is_allowed = True
                break

        # If extension is not allowed, return error
        if not is_allowed:
            return generate_response(
                is_content=True,
                status=400,
                title="HTTP 400: Bad Request!",
                description="Invalid file extension!",
                details={
                    "allowed_extensions": allowed_extensions
                }
            )

        else:
            return generate_response(
                is_content=True,
                status=200,
                title="HTTP 200: OK",
                description="File extension is allowed!",
                details={
                    "ext": ext,
                    "is_allowed": True
                }
            )

    except Exception as e:

        print("Exception: ", e)
        return generate_response(
            is_content=True,
            status=500,
            title="HTTP 500: Internal Server Error!",
            description="Internal Server Error!"
        )


async def transform_icon(icon: UploadFile, ext: str):

    try:
        icon_data = None  # Result variable

        if not ext == "svg":
            # Get Icon
            icon = Image.open(BytesIO(icon.file.read()))

            # Transform image to bytes
            icon_bytes = BytesIO()
            icon.save(icon_bytes, format=pillow_format[ext])

            # Assign to response variable
            icon_data = icon_bytes.getvalue()

        else:

            # Get SVG Icon (Just plain string)
            icon_data = await icon.read()

        # Return success
        return icon_data

    except Exception as e:

        print("Exception: ", e)
        return None
