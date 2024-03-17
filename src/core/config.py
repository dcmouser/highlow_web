from pydantic import AnyHttpUrl, EmailStr, validator
from pydantic_settings import BaseSettings
from typing import List, Optional, Union


class Settings(BaseSettings):
    CORS_LIST: list[str] = ["http://localhost", "http://localhost:4200", "http://localhost:3000", "http://localhost:8080", "http://192.168.0.11:3000"]
    DATABASE_URL: Optional[str] = "sqlite+aiosqlite:///./data/test.db"


    def getCorsList(self):
        return self.CORS_LIST

    def getDatabaseUrl(self):
        return self.DATABASE_URL


    class Config:
        case_sensitive = True




settings = Settings()
