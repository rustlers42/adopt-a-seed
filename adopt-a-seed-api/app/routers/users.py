from fastapi import APIRouter, Depends, Response, status
from pydantic import BaseModel

from ..database import get_session
from ..models.User import User
from ..oauth2_helper import get_current_user, get_password_hash

router = APIRouter()


class UserResponse(BaseModel):
    email: str
    username: str
    score: int


class UserScoreResponse(BaseModel):
    username: str
    score: int


@router.get("/scores", response_model=list[UserScoreResponse])
async def get_users_scores(*, session=Depends(get_session)):
    """
    Get all users and their scores
    """
    all_users = session.query(User).all()
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
    )


@router.post("/fill", tags=["mock"])
async def fill_users(*, session=Depends(get_session)):
    """
    Fill the users table with some data
    """
    user = [
        User(
            email="admin@admin.de",
            username="admin",
            hashed_password=get_password_hash("admin"),
            score=0,
        )
    ]
    session.add_all(user)
    session.commit()
    return Response(content="OK", status_code=status.HTTP_200_OK)
