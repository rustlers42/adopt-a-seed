import logging
import os
import signal
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, SQLModel

from .database import engine
from .mock_data_helper import setup_mock_data
from .routers import router as api_router


def create_db_and_tables():
    logging.info("creating database and tables")
    SQLModel.metadata.create_all(engine)

    with Session(engine) as session:
        setup_mock_data(session)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logging.info("lifespan called")
    try:
        """
        create a new process group, all
        subprocess will inherit this.
        """
        os.setsid()
        create_db_and_tables()

        yield

        """
        terminate the entire group 
        (including subprocesses)
        """
        os.killpg(os.getpgrp(), signal.SIGTERM)
    except Exception as e:
        print(f"Error: {str(e)}")


app = FastAPI(title="adopt-a-seed-api", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(api_router)
