from enum import Enum


class PlantStatus(Enum):
    PENDING = "Pending"
    GERMINATION = "Germination"
    SEEDLING = "Seedling"
    VEGETATIVE_PHASE = "Vegetative Phase"
    REPRODUCTIVE_PHASE = "Reproductive Phase"
    RETURNED_SEEDS = "Returned Seeds"

    def get_next_status(self) -> any:
        match self:
            case PlantStatus.PENDING:
                return PlantStatus.GERMINATION
            case PlantStatus.GERMINATION:
                return PlantStatus.SEEDLING
            case PlantStatus.SEEDLING:
                return PlantStatus.VEGETATIVE_PHASE
            case PlantStatus.VEGETATIVE_PHASE:
                return PlantStatus.REPRODUCTIVE_PHASE
            case PlantStatus.REPRODUCTIVE_PHASE:
                return PlantStatus.RETURNED_SEEDS
            case _:
                return None
