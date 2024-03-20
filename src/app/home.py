# fastapi
from fastapi import APIRouter, Depends

# user modules
from .fapiusers import current_active_user
from .models import User




# router linked from parent
router = APIRouter()


# routes
@router.get("/")
async def root():
    return {"message": "Hello world at root"}


# test route that requires authentification
@router.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}
