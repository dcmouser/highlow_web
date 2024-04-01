# fastapi
from fastapi import Depends, Request

# fastapi-users
from fastapi_users import BaseUserManager, UUIDIDMixin
from fastapi_users.authentication import (
    JWTStrategy
)
from fastapi_users.db import SQLAlchemyUserDatabase


# python
import uuid
from typing import Optional
import logging


# user modules
from lib.logger import jrprint
#
from .models import User
from .dbase import get_user_db
#
from .authHelper import sendSignupEmailVerificationEmail



# module globals
SECRET = "WhenAllElseFailsSecret"



# support class for UserManager
class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        jrprint(f"User {user.id} has registered.")
        # send them an email verification
        sendSignupEmailVerificationEmail(user)

    async def on_after_forgot_password(self, user: User, token: str, request: Optional[Request] = None):
        jrprint(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(self, user: User, token: str, request: Optional[Request] = None):
        jrprint(f"Verification requested for user {user.id}. Verification token: {token}")




# functions that are called by others
async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)

def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=3600)

def get_cookie_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=3600)