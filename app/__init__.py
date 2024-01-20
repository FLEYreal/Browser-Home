# FastAPI Imports
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware

# Modules
from .routers import item, shelf
from .utils.responses import generate_response

# Variables
app = FastAPI(
    title="Browser-Home-API"
)


# Customize Error Response
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder(generate_response(
            status=422,
            title="HTTP 422: Validation Error!",
            description="Values you sent smell wrong, you know?",
            details=exc.errors()
        ))
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
app.include_router(item.router)
app.include_router(shelf.router)
