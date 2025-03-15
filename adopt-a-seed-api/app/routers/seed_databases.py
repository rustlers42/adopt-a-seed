from fastapi import APIRouter, Depends, Response, status
from pydantic import BaseModel
from sqlmodel import Session

from ..database import get_session
from ..models.Seed import Seed
from ..models.SeedDatabase import SeedDatabase
from ..models.SeedToSeedDatabase import SeedToSeedDatabase

router = APIRouter()


class SeedDatabaseWithSeeds(BaseModel):
    id: int
    name: str
    contact: str
    seeds: list[Seed] = []


@router.get("", response_model=list[SeedDatabase])
async def get_seed_databases(*, session: Session = Depends(get_session)):
    """
    Get all seeds databases
    """
    return session.query(SeedDatabase).all()


@router.get("/seeds")
async def get_seed_databases_with_seeds(*, session: Session = Depends(get_session)):
    """
    Get all seeds for all seed databases
    """
    seed_databases = session.query(SeedDatabase).all()
    seed_database_with_seeds = []
    for seed_database in seed_databases:
        seeds = (
            session.query(Seed)
            .join(SeedToSeedDatabase)
            .filter(SeedToSeedDatabase.seed_database_id == seed_database.id)
            .all()
        )
        seed_database_with_seeds.append(
            SeedDatabaseWithSeeds(
                id=seed_database.id,
                name=seed_database.name,
                contact=seed_database.contact,
                seeds=seeds,
            )
        )
    return seed_database_with_seeds


# function to fill the database with some initial data
@router.post("/fill", tags=["mock"])
async def fill_seed_databases(*, session: Session = Depends(get_session)):
    """
    Fill the database with some initial data
    """
    seed_databases = [
        SeedDatabase(name="Manhattan Seed Database", contact="example@example.com"),
        SeedDatabase(name="Brooklyn Seed Bank", contact="contact@brooklynseed.com"),
        SeedDatabase(name="Queens Urban Seeds", contact="info@queensseeds.org"),
        SeedDatabase(name="Bronx Green Seeds", contact="support@bronxgreens.com"),
        SeedDatabase(
            name="Staten Island Seed Vault", contact="admin@statenislandseeds.com"
        ),
        SeedDatabase(
            name="Chicago Seed Repository", contact="contact@chicagoseeds.com"
        ),
        SeedDatabase(
            name="San Francisco Seed Library", contact="info@sfseedlibrary.org"
        ),
        SeedDatabase(
            name="Los Angeles Seed Exchange", contact="support@laseedexchange.com"
        ),
        SeedDatabase(name="Seattle Seed Collective", contact="admin@seattleseeds.com"),
        SeedDatabase(name="Portland Seed Network", contact="contact@portlandseeds.net"),
    ]
    session.add_all(seed_databases)
    session.commit()
    return Response(content="OK", status_code=status.HTTP_200_OK)


@router.post("/seeds/fill", tags=["mock"])
async def fill_seed_databases_seed(*, session: Session = Depends(get_session)):
    """
    Fill the database with some initial data
    """
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
    return Response(content="OK", status_code=status.HTTP_200_OK)
