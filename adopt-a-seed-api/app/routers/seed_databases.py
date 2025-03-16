from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlmodel import Session

from ..database import get_session
from ..models import Seed, SeedDatabase, SeedToSeedDatabase

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
