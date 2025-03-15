from datetime import date

from fastapi import APIRouter, Depends, Response, status
from sqlmodel import Session

from ..database import get_session
from ..models.Plant import Plant

router = APIRouter()


@router.get("", response_model=list[Plant])
async def get_plants(*, session: Session = Depends(get_session)):
    """
    Get all plants
    """
    return session.query(Plant).all()


@router.post("", response_model=Plant)
async def post_plant(plant: Plant, session: Session = Depends(get_session)):
    """
    Create a new plant
    """
    session.add(plant)
    session.commit()
    session.refresh(plant)
    return plant


@router.put("/{plant_id}", response_model=Plant)
async def put_plant(
    plant_id: int, plant: Plant, session: Session = Depends(get_session)
):
    """
    Update a plant
    """
    db_plant = session.get(Plant, plant_id)

    # update the plant with the new data
    db_plant.seed_id = plant.seed_id
    db_plant.planted_at = plant.planted_at

    session.add(db_plant)
    session.commit()
    session.refresh(db_plant)
    return db_plant


@router.post("/fill", tags=["mock"])
async def fill_plants(*, session: Session = Depends(get_session)):
    """
    Fill the database with some initial data
    """
    plants = [
        Plant(seed_id=1, planted_at=date(2025, 1, 1).isoformat()),
        Plant(seed_id=2, planted_at=date(2025, 1, 2).isoformat()),
        Plant(seed_id=3, planted_at=date(2025, 1, 3).isoformat()),
        Plant(seed_id=4, planted_at=date(2025, 1, 4).isoformat()),
        Plant(seed_id=5, planted_at=date(2025, 1, 5).isoformat()),
    ]
    session.add_all(plants)
    session.commit()
    return Response(content="OK", status_code=status.HTTP_200_OK)
