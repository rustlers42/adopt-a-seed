from sqlmodel import Field, SQLModel


class Plant(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(default=None, foreign_key="user.id")
    seed_id: int = Field(default=None, foreign_key="seed.id")
    planted_at: str
