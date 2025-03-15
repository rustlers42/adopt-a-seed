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
