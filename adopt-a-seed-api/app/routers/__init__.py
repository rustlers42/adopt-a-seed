from fastapi import APIRouter

from .health import router as health_router
from .plants import router as plants_router
from .seed_databases import router as seed_databases_router
from .seeds import router as seeds_router

router = APIRouter()
router.include_router(health_router, prefix="/health", tags=["health"])
router.include_router(plants_router, prefix="/plants")
router.include_router(seed_databases_router, prefix="/seed_databases")
router.include_router(seeds_router, prefix="/seeds")
