from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlmodel import Session, select

from ..database import get_session
from ..models import Event, Plant, Seed, User
from ..oauth2_helper import get_current_user

router = APIRouter()


class PlantRequest(BaseModel):
    seed_id: int
    planted_at: str


class PlantResponse(BaseModel):
    id: int
    seed_category: str
    seed_specific: str
    current_status: str
    planted_at: str | None


@router.get("", response_model=list[PlantResponse])
async def get_plants(
    *,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Get all plants
    """
    plants = session.exec(
        select(
            Plant.id,
            Seed.category,
            Seed.specific_name,
            Plant.current_status,
            Plant.planted_at,
        )
        .where(Plant.user_id == current_user.id)
        .join(Seed, Plant.seed_id == Seed.id)
    ).all()
    print(plants)
    return [
        PlantResponse(
            id=plant.id,
            seed_category=plant.category,
            seed_specific=plant.specific_name,
            current_status=plant.current_status,
            planted_at=plant.planted_at,
        )
        for plant in plants
    ]


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


@router.get("/{plant_id}", response_model=PlantResponse)
async def get_plant(
    plant_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Get a plant
    """
    plant = session.exec(
        select(
            Plant.id,
            Seed.category,
            Seed.specific_name,
            Plant.current_status,
            Plant.planted_at,
        )
        .where(Plant.user_id == current_user.id, Plant.id == plant_id)
        .join(Seed, Plant.seed_id == Seed.id)
    ).first()
    return PlantResponse(
        id=plant.id,
        seed_category=plant.category,
        seed_specific=plant.specific_name,
        current_status=plant.current_status,
        planted_at=plant.planted_at,
    )


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


@router.get("/{plant_id}/events", response_model=list[Event])
async def get_users_me_events(
    plant_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Get the events of the current user
    """
    return session.exec(
        select(Event)
        .where(Event.user_id == current_user.id, Event.plant_id == plant_id)
        .order_by(Event.event_date)
    ).all()
