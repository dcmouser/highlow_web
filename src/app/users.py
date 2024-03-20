# fastapi
from fastapi import APIRouter, Depends







# router linked from parent
router = APIRouter()

# routes
@router.get("/")
async def root():
    return {"message": "My user home"}
