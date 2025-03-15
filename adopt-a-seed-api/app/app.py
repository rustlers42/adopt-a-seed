import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel

from .database import engine
from .routers import router as api_router

logging.getLogger().setLevel(logging.INFO)

app = FastAPI(title="adopt-a-seed-api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


def create_db_and_tables():
    logging.info("Creating database and tables")
    SQLModel.metadata.create_all(engine)


@app.on_event("startup")
async def startup():
    create_db_and_tables()
    logging.info("startup called")


app.include_router(api_router)
