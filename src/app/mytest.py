# fastapi
from fastapi import APIRouter, Depends, Request
from fastapi.templating import Jinja2Templates

# user modules
from .fapiusers import current_active_user
from .models import User

# python modules
from pathlib import Path




# templates
BASE_PATH = Path(__file__).resolve().parent.parent
TEMPLATE_PATH = str(BASE_PATH / "templates")
TEMPLATES = Jinja2Templates(directory=TEMPLATE_PATH)
# test
testRecipes = [
    {
        "id": 1,
        "label": "Chicken Vesuvio",
        "source": "Serious Eats",
        "url": "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
    },
    {
        "id": 2,
        "label": "Chicken Paprikash",
        "source": "No Recipes",
        "url": "http://norecipes.com/recipe/chicken-paprikash/",
    },
    {
        "id": 3,
        "label": "Cauliflower and Tofu Curry Recipe",
        "source": "Serious Eats",
        "url": "http://www.seriouseats.com/recipes/2011/02/cauliflower-and-tofu-curry-recipe.html",
    },
]



# router linked from parent
router = APIRouter()


# routes
@router.get("/", status_code=200)
def root(request: Request) -> dict:
    """
    Root GET
    """
    
    # 3
    return TEMPLATES.TemplateResponse(
        "index.html",
        {"request": request, "recipes": testRecipes},
    )
