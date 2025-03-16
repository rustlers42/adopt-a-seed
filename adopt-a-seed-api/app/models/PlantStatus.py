from enum import Enum


class PlantStatus(Enum):
    PENDING = "Pending"
    GERMINATION = "Germination"
    SEEDLING = "Seedling"
    VEGETATIVE_PHASE = "Vegetative Phase"
    REPRODUCTIVE_PHASE = "Reproductive Phase"
    RETURNED_SEEDS = "Returned Seeds"
