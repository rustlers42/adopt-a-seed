import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ollama import AsyncClient
from sqlmodel import Session, SQLModel

from .database import engine
from .mock_data_helper import setup_mock_data
from .routers import router as api_router
from .settings import settings


def create_db_and_tables():
    logging.info("creating database and tables")
    SQLModel.metadata.create_all(engine)

    with Session(engine) as session:
        setup_mock_data(session)


async def check_ollama_models():
    logging.info("try to pull ollama model")
    await AsyncClient(host=settings.ollama_url).pull(settings.ollama_model)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logging.info("lifespan called")
    create_db_and_tables()
    await check_ollama_models()
    yield
    logging.info("lifespan ending")


app = FastAPI(title="adopt-a-seed-api", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(api_router)
