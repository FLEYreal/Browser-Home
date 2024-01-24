# FastAPI Imports
from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware

# Modules
from .routers.item import router as item_router
from .routers.shelf import router as shelf_router
from .utils.responses import generate_response

# Global Project's Variables
api_prefix = "/api/v1"
app = FastAPI(
    title="Browser-Home-API"
)


# Customize Error Response
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return generate_response(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        status=422,
        title="HTTP 422: Validation Error!",
        description="Values you sent smell wrong, you know?",
        details=exc.errors()
    )


# Middlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "https://localhost",
        "http://localhost:7979",  # Backend Port
        "http://localhost:9797"  # Frontend Port
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(item_router, prefix=api_prefix)
app.include_router(shelf_router, prefix=api_prefix)
