from sqlmodel import Field, SQLModel


class SeedDatabase(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    contact: str
