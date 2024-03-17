# fastapi modules
from fastapi import Depends
from fastapi_users.db import SQLAlchemyBaseUserTableUUID, SQLAlchemyUserDatabase

# sqlalchemy modules
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

# python modules
from typing import AsyncGenerator

# user modeules
from core.config import settings
from lib.logger import jrprint, jrlog




# sqlite db
databaseUrl = settings.getDatabaseUrl()

# module globals
engine = create_async_engine(databaseUrl)
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)
jrlog("Using database '{}'.".format(databaseUrl))




class Base(DeclarativeBase):
    pass

class User(SQLAlchemyBaseUserTableUUID, Base):
    pass






async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)
