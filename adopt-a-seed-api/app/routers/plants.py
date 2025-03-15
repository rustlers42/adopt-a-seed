from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlmodel import Session, select

from ..database import get_session
from ..models.Plant import Plant
from ..models.User import User
from ..oauth2_helper import get_current_user

router = APIRouter()


class PlantRequest(BaseModel):
    seed_id: int
    planted_at: str


@router.get("", response_model=list[Plant])
async def get_plants(
    *,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Get all plants
    """
    return session.exec(select(Plant).where(Plant.user_id == current_user.id)).all()


@router.post("", response_model=Plant)
async def post_plant(
    plant: PlantRequest,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Create a new plant
    """
    db_plant = Plant(**plant.dict(), user_id=current_user.id)
    session.add(db_plant)
    session.commit()
    session.refresh(db_plant)
    return db_plant


@router.put("/{plant_id}", response_model=Plant)
async def put_plant(
    plant_id: int,
    plant: PlantRequest,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Update a plant
    """
    db_plant = session.get(Plant, plant_id)

    db_plant.seed_id = plant.seed_id
    db_plant.planted_at = plant.planted_at

    session.add(db_plant)
    session.commit()
    session.refresh(db_plant)
    return db_plant
