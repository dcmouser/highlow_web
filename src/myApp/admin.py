# fastapi
from fastapi import APIRouter



# router linked from parent
router = APIRouter()


# routes
@router.get("/")
async def root():
    return {"message": "Admin home"}
