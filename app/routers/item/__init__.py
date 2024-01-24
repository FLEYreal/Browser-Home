# FastAPI Imports
from fastapi import APIRouter

# Utils
from ...utils.responses import responses

# Import all endpoints
from .get import router as get
from .post import router as post
from .post_icon import router as post_icon
from .post_update import router as post_update
from .delete_update import router as delete_update

# Initialize router for "/item" API
router = APIRouter(
    prefix="/item",
    tags=["item"],
    responses=responses
)

# Include all endpoints to the router
router.include_router(get)
router.include_router(post)
router.include_router(post_icon)
router.include_router(post_update)
router.include_router(delete_update)
