from fastapi import APIRouter, Depends
from sqlmodel import Session

from ..database import get_session
from ..models import Seed

router = APIRouter()


@router.get("", response_model=list[Seed])
async def get_seeds(*, session: Session = Depends(get_session)):
    """
    Get all seeds
    """
    return session.query(Seed).all()
