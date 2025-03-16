from sqlmodel import Field, SQLModel

from .PlantStatus import PlantStatus


class Plant(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(default=None, foreign_key="user.id")
    seed_id: int = Field(default=None, foreign_key="seed.id")
    current_status: PlantStatus = Field(default=PlantStatus.PENDING)
    planted_at: str | None = Field(default=None)
