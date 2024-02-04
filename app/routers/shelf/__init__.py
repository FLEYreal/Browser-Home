# FastAPI Imports
from fastapi import APIRouter

# Utils
from ...utils.responses import responses

# Import all endpoints
from .get import router as get
from .post import router as post
from .post_update import router as post_update
from .delete import router as delete

# Initialize router for "/shelf" API
router = APIRouter(
    prefix="/shelf",
    tags=["shelf"],
    responses=responses
)

# Include all endpoints to the router
router.include_router(get)
router.include_router(post)
router.include_router(post_update)
router.include_router(delete)
