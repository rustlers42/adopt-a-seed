import logging
from datetime import date

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, SQLModel, select

from .database import engine
from .models import Event, Plant, Seed, SeedDatabase, SeedToSeedDatabase, User
from .models.EventType import EventType
from .models.PlantStatus import PlantStatus
from .oauth2_helper import get_password_hash
from .routers import router as api_router

app = FastAPI(title="adopt-a-seed-api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


def create_db_and_tables():
    logging.info("creating database and tables")
    SQLModel.metadata.create_all(engine)

    with Session(engine) as session:
        if session.exec(select(User)).first() is None:
            logging.info("creating default users because there are none")
            user = [
                User(
                    email="admin@admin.de",
                    username="admin",
                    hashed_password=get_password_hash("admin"),
                    score=0,
                ),
                User(
                    email="user@user.de",
                    username="user",
                    hashed_password=get_password_hash("user"),
                    score=500,
                ),
            ]
            session.add_all(user)
            session.commit()

        if session.exec(select(Seed)).first() is None:
            logging.info("creating default seeds because there are none")
            seeds = [
                Seed(category="Tomato", specific_name="Siberian Tomato"),
                Seed(category="Tomato", specific_name="Cherry Tomato"),
                Seed(category="Potato", specific_name="Yukon Gold Potato"),
                Seed(category="Potato", specific_name="Russet Potato"),
                Seed(category="Carrot", specific_name="Nantes Carrot"),
                Seed(category="Carrot", specific_name="Purple Carrot"),
                Seed(category="Lettuce", specific_name="Butterhead Lettuce"),
                Seed(category="Lettuce", specific_name="Romaine Lettuce"),
                Seed(category="Basil", specific_name="Genovese Basil"),
                Seed(category="Basil", specific_name="Thai Basil"),
                Seed(category="Oregano", specific_name="Greek Oregano"),
                Seed(category="Oregano", specific_name="Italian Oregano"),
                Seed(category="Pepper", specific_name="Bell Pepper"),
                Seed(category="Pepper", specific_name="Jalapeno Pepper"),
                Seed(category="Cucumber", specific_name="Marketmore Cucumber"),
                Seed(category="Cucumber", specific_name="Lemon Cucumber"),
                Seed(category="Spinach", specific_name="Bloomsdale Spinach"),
                Seed(category="Spinach", specific_name="Savoy Spinach"),
                Seed(category="Kale", specific_name="Lacinato Kale"),
                Seed(category="Kale", specific_name="Curly Kale"),
                Seed(category="Zucchini", specific_name="Black Beauty Zucchini"),
                Seed(category="Zucchini", specific_name="Golden Zucchini"),
                Seed(category="Rosemary", specific_name="Tuscan Blue Rosemary"),
                Seed(category="Rosemary", specific_name="Common Rosemary"),
                Seed(category="Thyme", specific_name="English Thyme"),
                Seed(category="Thyme", specific_name="Lemon Thyme"),
                Seed(category="Mint", specific_name="Spearmint"),
                Seed(category="Mint", specific_name="Peppermint"),
                Seed(category="Parsley", specific_name="Italian Flat Leaf Parsley"),
                Seed(category="Parsley", specific_name="Curly Parsley"),
                Seed(category="Chives", specific_name="Garlic Chives"),
                Seed(category="Chives", specific_name="Onion Chives"),
                Seed(category="Dill", specific_name="Fernleaf Dill"),
                Seed(category="Dill", specific_name="Bouquet Dill"),
                Seed(category="Cilantro", specific_name="Slow Bolt Cilantro"),
                Seed(category="Cilantro", specific_name="Vietnamese Cilantro"),
                Seed(category="Sage", specific_name="Common Sage"),
                Seed(category="Sage", specific_name="Purple Sage"),
            ]
            session.add_all(seeds)
            session.commit()

        if session.exec(select(SeedDatabase)).first() is None:
            logging.info("creating default seed databases because there are none")
            seed_databases = [
                SeedDatabase(
                    name="Manhattan Seed Database", contact="example@example.com"
                ),
                SeedDatabase(
                    name="Brooklyn Seed Bank", contact="contact@brooklynseed.com"
                ),
                SeedDatabase(name="Queens Urban Seeds", contact="info@queensseeds.org"),
                SeedDatabase(
                    name="Bronx Green Seeds", contact="support@bronxgreens.com"
                ),
                SeedDatabase(
                    name="Staten Island Seed Vault",
                    contact="admin@statenislandseeds.com",
                ),
                SeedDatabase(
                    name="Chicago Seed Repository", contact="contact@chicagoseeds.com"
                ),
                SeedDatabase(
                    name="San Francisco Seed Library", contact="info@sfseedlibrary.org"
                ),
                SeedDatabase(
                    name="Los Angeles Seed Exchange",
                    contact="support@laseedexchange.com",
                ),
                SeedDatabase(
                    name="Seattle Seed Collective", contact="admin@seattleseeds.com"
                ),
                SeedDatabase(
                    name="Portland Seed Network", contact="contact@portlandseeds.net"
                ),
            ]
            session.add_all(seed_databases)
            session.commit()

        if session.exec(select(Plant)).first() is None:
            logging.info("creating default plants because there are none")
            plants = [
                Plant(
                    seed_id=1,
                    seed_database_id=1,
                    user_id=1,
                    current_status=PlantStatus.RETURNED_SEEDS,
                    planted_at=date(2025, 1, 1).isoformat(),
                ),
                Plant(
                    seed_id=2,
                    seed_database_id=1,
                    user_id=1,
                    current_status=PlantStatus.REPRODUCTIVE_PHASE,
                    planted_at=date(2025, 1, 2).isoformat(),
                ),
                Plant(
                    seed_id=3,
                    seed_database_id=None,
                    user_id=1,
                    current_status=PlantStatus.VEGETATIVE_PHASE,
                    planted_at=date(2025, 1, 3).isoformat(),
                ),
                Plant(
                    seed_id=4,
                    seed_database_id=None,
                    user_id=1,
                    current_status=PlantStatus.GERMINATION,
                    planted_at=date(2025, 1, 4).isoformat(),
                ),
                Plant(
                    seed_id=5,
                    seed_database_id=2,
                    user_id=1,
                    current_status=PlantStatus.PENDING,
                    planted_at=None,
                ),
                Plant(
                    seed_id=5,
                    seed_database_id=2,
                    user_id=2,
                    current_status=PlantStatus.VEGETATIVE_PHASE,
                    planted_at=date(2025, 1, 5).isoformat(),
                ),
            ]
            session.add_all(plants)
            session.commit()

        if session.exec(select(Event)).first() is None:
            logging.info("creating default events because there are none")
            events = [
                Event(
                    event_type=EventType.GLOBAL_NEWS,
                    event_date=date(2025, 1, 1).isoformat(),
                    event_description="New Year's Day",
                ),
                Event(
                    event_type=EventType.GROWING,
                    event_date=date(2025, 1, 3).isoformat(),
                    user_id=1,
                    plant_id=1,
                    event_description=f"Changed status from {PlantStatus.PENDING} to {PlantStatus.GERMINATION}",
                ),
                Event(
                    event_type=EventType.GROWING,
                    event_date=date(2025, 1, 7).isoformat(),
                    user_id=1,
                    plant_id=1,
                    event_description=f"Changed status from {PlantStatus.GERMINATION} to {PlantStatus.SEEDLING}",
                ),
                Event(
                    event_type=EventType.GROWING,
                    event_date=date(2025, 1, 17).isoformat(),
                    user_id=1,
                    plant_id=1,
                    event_description=f"Changed status from {PlantStatus.SEEDLING} to {PlantStatus.VEGETATIVE_PHASE}",
                ),
                Event(
                    event_type=EventType.GROWING,
                    event_date=date(2025, 2, 16).isoformat(),
                    user_id=1,
                    plant_id=1,
                    event_description=f"Changed status from {PlantStatus.VEGETATIVE_PHASE} to {PlantStatus.REPRODUCTIVE_PHASE}",
                ),
                Event(
                    event_type=EventType.GROWING,
                    event_date=date(2025, 3, 15).isoformat(),
                    user_id=1,
                    plant_id=1,
                    event_description=f"Changed status from {PlantStatus.REPRODUCTIVE_PHASE} to {PlantStatus.RETURNED_SEEDS}",
                ),
            ]
            session.add_all(events)
            session.commit()

        if session.exec(select(SeedToSeedDatabase)).first() is None:
            logging.info(
                "creating default seed to seed database mapping because there are none"
            )
            seed_to_seed_database_mapping = [
                SeedToSeedDatabase(seed_id=1, seed_database_id=1),
                SeedToSeedDatabase(seed_id=2, seed_database_id=1),
                SeedToSeedDatabase(seed_id=3, seed_database_id=1),
                SeedToSeedDatabase(seed_id=4, seed_database_id=1),
                SeedToSeedDatabase(seed_id=5, seed_database_id=1),
                SeedToSeedDatabase(seed_id=1, seed_database_id=2),
                SeedToSeedDatabase(seed_id=2, seed_database_id=2),
                SeedToSeedDatabase(seed_id=3, seed_database_id=2),
                SeedToSeedDatabase(seed_id=4, seed_database_id=2),
                SeedToSeedDatabase(seed_id=5, seed_database_id=2),
            ]
            session.add_all(seed_to_seed_database_mapping)
            session.commit()


@app.on_event("startup")
async def startup():
    create_db_and_tables()
    logging.info("startup called")


app.include_router(api_router)
