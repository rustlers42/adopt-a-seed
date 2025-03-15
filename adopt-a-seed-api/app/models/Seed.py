from sqlmodel import Field, SQLModel


class Seed(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    category: str
    specific_name: str
