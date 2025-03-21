from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session

from ..database import get_session
from ..oauth2_helper import Token, authenticate_user, create_access_token
from ..settings import settings
from .events import router as events_router
from .health import router as health_router
from .plants import router as plants_router
from .seed_databases import router as seed_databases_router
from .seeds import router as seeds_router
from .users import router as users_router

router = APIRouter()
router.include_router(health_router, prefix="/health", tags=["health"])
router.include_router(events_router, prefix="/events")
router.include_router(plants_router, prefix="/plants")
router.include_router(seed_databases_router, prefix="/seed_databases")
router.include_router(seeds_router, prefix="/seeds")
router.include_router(users_router, prefix="/users")


@router.post("/token", tags=["auth"])
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Session = Depends(get_session),
) -> Token:
    user = authenticate_user(session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"email": user.email}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")
