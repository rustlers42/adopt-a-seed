from sqlmodel import Field, SQLModel


class SeedToSeedDatabase(SQLModel, table=True):
    seed_id: int = Field(default=None, foreign_key="seed.id", primary_key=True)
    seed_database_id: int = Field(
        default=None, foreign_key="seeddatabase.id", primary_key=True
    )
