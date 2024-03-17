# fastapi
from fastapi import Depends


# fastapi-users
from fastapi_users import FastAPIUsers
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    CookieTransport
)


# python modules
import uuid


# user modules
from .dbase import User
from .schemas import UserCreate, UserRead, UserUpdate
from .fapiusermanager import get_jwt_strategy, get_cookie_strategy, get_user_manager





# module globals

bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")
cookie_transport  = CookieTransport(cookie_max_age=3600)

auth_backend_jwt = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)

auth_backend_cookie = AuthenticationBackend(
    name="cookie",
    transport=cookie_transport,
    get_strategy=get_cookie_strategy,
)

fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend_jwt, auth_backend_cookie])
current_active_user = fastapi_users.current_user(active=True)





# called by web app to register routers used by fastapi-users to support login

def addRouters(app):
    # auth routes
    app.include_router(
        fastapi_users.get_auth_router(auth_backend_jwt), prefix="/auth/jwt", tags=["auth"]
    )
    app.include_router(
        fastapi_users.get_auth_router(auth_backend_cookie), prefix="/auth/cookie", tags=["auth"]
    )
    app.include_router(
        fastapi_users.get_register_router(UserRead, UserCreate),
        prefix="/auth",
        tags=["auth"],
    )
    app.include_router(
        fastapi_users.get_reset_password_router(),
        prefix="/auth",
        tags=["auth"],
    )
    app.include_router(
        fastapi_users.get_verify_router(UserRead),
        prefix="/auth",
        tags=["auth"],
    )
    #
    app.include_router(
        fastapi_users.get_users_router(UserRead, UserUpdate),
        prefix="/users",
        tags=["users"],
    )
