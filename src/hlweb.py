# user modules
from myApp import home, users, admin, dbase, fapiusers

# fastapi
from fastapi import FastAPI
from contextlib import asynccontextmanager



# fastapi lifespan helper
# see https://fastapi-users.github.io/fastapi-users/latest/configuration/full-example/#__tabbed_1_3
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Not needed if you setup a migration system like Alembic
    await dbase.create_db_and_tables()
    yield

# define fastapi app
app = FastAPI(lifespan=lifespan)



# fastapi routes contained in other files
app.include_router(home.router, prefix="", tags=["home"])
app.include_router(admin.router, prefix="/admin", tags=["admin"])
app.include_router(users.router, prefix="/myusers", tags=["myusers"])

# fast api auth routers
fapiusers.addRouters(app)





def runUvicorn():
    import uvicorn
    print("Running uvicorn...")
    uvicorn.run("hlweb:app", reload=False, log_level="info")


if __name__ == "__main__":
    print("Launching uvicorn server from main() in hlweb..")
    runUvicorn()
