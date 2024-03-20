# fastapi modules
from fastapi_users.db import SQLAlchemyBaseUserTableUUID

# sqlalchemy modules
from sqlalchemy.orm import DeclarativeBase, Mapped











class Base(DeclarativeBase):
    pass


class User(SQLAlchemyBaseUserTableUUID, Base):
    username: Mapped[str]
    pass


