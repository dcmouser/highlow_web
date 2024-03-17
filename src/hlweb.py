# fastapi modules
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# python modules
from contextlib import asynccontextmanager

# user modules
from myApp import home, users, admin, dbase, fapiusers, mytest
from core.config import settings





# fastapi lifespan helper that helps to create initial database
# see https://fastapi-users.github.io/fastapi-users/latest/configuration/full-example/#__tabbed_1_3
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Not needed if you setup a migration system like Alembic
    await dbase.create_db_and_tables()
    yield


# define fastapi app
app = FastAPI(lifespan=lifespan)


# add fastapi middleware for cores
corsOrigins = settings.getCorsList()
app.add_middleware(
    CORSMiddleware,
    allow_origins=corsOrigins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




# fastapi routes contained in other files, one per file
app.include_router(home.router, prefix="", tags=["home"])
app.include_router(admin.router, prefix="/admin", tags=["admin"])
app.include_router(users.router, prefix="/myusers", tags=["myusers"])
app.include_router(mytest.router, prefix="/mytest", tags=["mytest"])

# now we add routes from fastapi-users module that provide authorization and authentification
fapiusers.addRouters(app)





def runUvicorn():
    # run web server to serve http requests
    import uvicorn
    print("Running uvicorn...")
    uvicorn.run("hlweb:app", reload=False, log_level="info")


if __name__ == "__main__":
    # when run as a standalone app, just launch the web server
    print("Launching uvicorn server from main() in hlweb..")
    runUvicorn()
