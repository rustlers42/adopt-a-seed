from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlmodel import Session, or_, select

from ..database import get_session
from ..models import Event, User
from ..oauth2_helper import get_current_user

router = APIRouter()


class UserResponse(BaseModel):
    email: str
    username: str
    score: int
    koppen_climate_classification: str


class UserScoreResponse(BaseModel):
    username: str
    score: int


@router.get("/scores", response_model=list[UserScoreResponse])
async def get_users_scores(*, session=Depends(get_session), order: str = "desc"):
    """
    Get all users and their scores
    """
    order_by_clause = User.score.desc() if order == "desc" else User.score.asc()
    all_users = session.exec(select(User).order_by(order_by_clause)).all()
    return [
        UserScoreResponse(username=user.username, score=user.score)
        for user in all_users
    ]


@router.get("/me", response_model=UserResponse)
async def get_users_me(*, current_user: User = Depends(get_current_user)):
    """
    Get the current user
    """
    return UserResponse(
        email=current_user.email,
        username=current_user.username,
        score=current_user.score,
        koppen_climate_classification=current_user.koppen_climate_classification.name,
    )


@router.get("/me/events", response_model=list[Event])
async def get_users_me_events(
    *,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
    order: str = "desc"
):
    """
    Get the events of the current user
    """
    order_by_clause = (
        Event.event_date.desc() if order == "desc" else Event.event_date.asc()
    )
    events = session.exec(
        select(Event)
        .where(or_(Event.user_id == current_user.id, Event.user_id == None))
        .order_by(order_by_clause)
    ).all()
    return events
