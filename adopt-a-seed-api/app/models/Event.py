from sqlmodel import Field, SQLModel

from .EventType import EventType


class Event(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.id")
    plant_id: int | None = Field(default=None, foreign_key="plant.id")
    event_type: EventType | None = Field(default=None)
    event_date: str = Field(default=None)
    event_description: str = Field(default=None)
