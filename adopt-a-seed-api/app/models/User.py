from sqlmodel import Field, SQLModel

from .KoppenClimateClassification import KoppenClimateClassification


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    email: str
    username: str
    score: int = 0
    hashed_password: str
    koppen_climate_classification: KoppenClimateClassification
