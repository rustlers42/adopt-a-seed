import enum
import logging
from datetime import date

from fastapi import APIRouter, BackgroundTasks, Depends, Response, status
from pydantic import BaseModel
from sqlmodel import Session, select, update

from ..database import get_session
from ..models import Event, Plant, Seed, SeedDatabase, User
from ..models.EventType import EventType
from ..models.PlantStatus import PlantStatus
from ..oauth2_helper import get_current_user
from ..prompts import (
    prompt_general_plant_help_messages,
    prompt_provide_growth_recommendations,
)

router = APIRouter()


class PlantRequest(BaseModel):
    seed_id: int
    seed_database_id: int | None
    planted_at: str


class PlantResponse(BaseModel):
    id: int
    seed_category: str
    seed_specific: str
    seed_database_name: str | None
    seed_database_contact: str | None
    current_status: str
    planted_at: str | None


class QuestionAnswer(enum.Enum):
    VeryGood = 1
    Good = 2
    Neutral = 3
    Bad = 4
    VeryBad = 5


class Question(BaseModel):
    id: int
    question: str
    answer: QuestionAnswer | str | None


class PlantStatusHelpResponse(BaseModel):
    text: str


class PlantStatusRequest(BaseModel):
    questions: list[Question]
    otp_question: Question | None


class PlantStatusResponse(PlantStatusRequest):
    current_status: str
    next_status: str


class PlantStatusUpdateResponse(BaseModel):
    increment_score: int
    is_transitioned: bool


questions = [
    Question(id=1, question="How wet is the soil?", answer=None),
    Question(
        id=2,
        question="Has the plant received enough water since the last quiz?",
        answer=None,
    ),
    Question(
        id=3, question="How much light is the plant receiving currently?", answer=None
    ),
    Question(
        id=4,
        question="Has the plant received sufficient light since the last quiz?",
        answer=None,
    ),
    Question(id=5, question="Do you see a sprout emerging?", answer=None),
    Question(
        id=6, question="Do you see noticeable growth since the last quiz?", answer=None
    ),
    Question(
        id=7, question="Has the plant started forming blossoms or buds?", answer=None
    ),
    Question(id=8, question="Does the plant look healthy overall?", answer=None),
    Question(
        id=9, question="Have you added any nutrients since the last quiz?", answer=None
    ),
    Question(id=10, question="Have you placed your seed into soil yet?", answer=None),
    Question(id=11, question="How big is the pot/container?", answer=None),
    Question(id=12, question="Has the plant developed any fruits?", answer=None),
    Question(id=13, question="Are there signs of pests or diseases?", answer=None),
    Question(
        id=14,
        question="Is the temperature appropriate for the current growth stage?",
        answer=None,
    ),
    Question(
        id=15, question="Is the humidity optimal for the current stage?", answer=None
    ),
    Question(
        id=16,
        question="Is the soil condition appropriate (e.g., nutrient levels, pH)?",
        answer=None,
    ),
    Question(
        id=17,
        question="Are plants appropriately spaced or do they need repotting?",
        answer=None,
    ),
    Question(
        id=18, question="Is pruning or trimming needed at this stage?", answer=None
    ),
    Question(id=19, question="Are stakes or supports necessary now?", answer=None),
    Question(
        id=20,
        question="Has the plant reached the recommended age for the next growth stage?",
        answer=None,
    ),
]

otp_question = Question(
    id=0,
    question="Enter the OTP from the seed database that you have successfully returned the seeds to the seed database",
    answer=None,
)

question_catalog = {
    PlantStatus.GERMINATION: [10, 11, 14, 15],  # 1, 3, 16
    PlantStatus.SEEDLING: [1, 3, 5, 8, 14, 15],  # 2, 4, 9, 13, 16
    PlantStatus.VEGETATIVE_PHASE: [
        1,
        2,
        3,
        4,
        6,
        8,
        9,
        14,
        15,
        17,
        20,
    ],  # 11, 13, 16, 18, 19
    PlantStatus.REPRODUCTIVE_PHASE: [
        1,
        3,
        6,
        7,
        8,
        9,
        14,
        15,
        16,
        18,
        20,
    ],  # 2, 4, 13, 17, 19
    PlantStatus.RETURNED_SEEDS: [8, 12, 13],  # 1, 7, 9, 16, 18, 19
}


@router.get("", response_model=list[PlantResponse])
async def get_plants(
    *,
    order: str = "desc",
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Get all plants
    """
    order_by_clause = (
        Plant.planted_at.desc().nullsfirst()
        if order == "desc"
        else Plant.planted_at.asc().nullslast()
    )
    plants = session.exec(
        select(
            Plant.id,
            Seed.category,
            Seed.specific_name,
            SeedDatabase.name,
            SeedDatabase.contact,
            Plant.current_status,
            Plant.planted_at,
        )
        .where(Plant.user_id == current_user.id)
        .join(Seed, Plant.seed_id == Seed.id)
        .join(SeedDatabase, Plant.seed_database_id == SeedDatabase.id, isouter=True)
        .order_by(order_by_clause)
    ).all()
    return [
        PlantResponse(
            id=plant.id,
            seed_category=plant.category,
            seed_specific=plant.specific_name,
            current_status=plant.current_status,
            seed_database_name=plant.name,
            seed_database_contact=plant.contact,
            planted_at=plant.planted_at,
        )
        for plant in plants
    ]


@router.post("", response_model=Plant)
async def post_plant(
    plant: PlantRequest,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Create a new plant
    """
    new_plant = Plant(
        **plant.model_dump(),
        user_id=current_user.id,
        current_status=PlantStatus.GERMINATION,
    )

    session.add(new_plant)
    session.commit()
    session.refresh(new_plant)
    new_event = Event(
        user_id=current_user.id,
        plant_id=new_plant.id,
        event_type=EventType.GROWING,
        event_date=new_plant.planted_at,
        event_description=f"Change status to {PlantStatus.GERMINATION.value}",
    )
    session.add(new_event)
    session.commit()
    session.refresh(new_plant)

    return new_plant


@router.get("/{plant_id}", response_model=PlantResponse)
async def get_plant(
    plant_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Get a plant
    """
    plant = session.exec(
        select(
            Plant.id,
            Seed.category,
            Seed.specific_name,
            SeedDatabase.name,
            SeedDatabase.contact,
            Plant.current_status,
            Plant.planted_at,
        )
        .where(Plant.user_id == current_user.id, Plant.id == plant_id)
        .join(Seed, Plant.seed_id == Seed.id)
        .join(SeedDatabase, Plant.seed_database_id == SeedDatabase.id, isouter=True)
    ).first()
    if plant is None:
        # plant does not count for the user return 404 not found
        return Response(status_code=status.HTTP_404_NOT_FOUND)
    return PlantResponse(
        id=plant.id,
        seed_category=plant.category,
        seed_specific=plant.specific_name,
        seed_database_name=plant.name,
        seed_database_contact=plant.contact,
        current_status=plant.current_status,
        planted_at=plant.planted_at,
    )


@router.put("/{plant_id}", response_model=Plant)
async def put_plant(
    plant_id: int,
    plant_request: PlantRequest,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Update a plant
    """
    plant = session.get(Plant, plant_id)
    if plant is None:
        # plant does not count for the user return 404 not found
        return Response(status_code=status.HTTP_404_NOT_FOUND)

    plant.seed_id = plant_request.seed_id
    plant.seed_database_id = plant_request.seed_database_id
    plant.planted_at = plant_request.planted_at

    session.add(plant)
    session.commit()
    session.refresh(plant)
    return plant


@router.get("/{plant_id}/status", response_model=PlantStatusResponse)
async def get_plant_status(
    plant_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Get the current status of the plant and questions needed to answer for the transition to the next status
    """
    plant = session.exec(
        select(Plant).where(Plant.user_id == current_user.id, Plant.id == plant_id)
    ).first()
    if plant is None:
        # plant does not count for the user return 404 not found
        return Response(status_code=status.HTTP_404_NOT_FOUND)
    next_status = plant.current_status.get_next_status()
    question_ids = question_catalog.get(next_status, [])
    questions_to_answer = [q for q in questions if q.id in question_ids]
    return PlantStatusResponse(
        current_status=plant.current_status.value,
        next_status=next_status.value if next_status else None,
        questions=questions_to_answer,
        otp_question=(
            otp_question if next_status == PlantStatus.RETURNED_SEEDS else None
        ),
    )


async def document_telemetry_data(
    plant_id: int,
    user_id: int,
    content: str,
    session: Session,
):
    messages_telemetry = await prompt_provide_growth_recommendations(content)

    # document telemetry data
    session.add(
        Event(
            user_id=user_id,
            plant_id=plant_id,
            event_type=EventType.PLANT_TELEMETRY,
            event_date=date.today().isoformat(),
            event_description=messages_telemetry,
        )
    )
    session.commit()


@router.post("/{plant_id}/status", response_model=PlantStatusUpdateResponse)
async def post_plant_status(
    plant_status_request: PlantStatusRequest,
    plant_id: int,
    background_tasks: BackgroundTasks,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
) -> Response:
    """
    Update the status of the plant for that firstly check the questions and answers for the transition to the next status. When certain criterias are met transition the plant to the next status and also create an event for that.
    """
    if (
        plant_status_request.otp_question is not None
        and plant_status_request.otp_question.answer != "000000"
    ):
        return Response(status_code=status.HTTP_400_BAD_REQUEST)
    plant = session.exec(
        select(
            Plant.planted_at, Seed.category, Seed.specific_name, Plant.current_status
        )
        .where(Plant.id == plant_id)
        .join(Seed, Seed.id == Plant.id)
    ).first()
    if plant is None:
        # plant does not count for the user return 404 not found
        return Response(status_code=status.HTTP_404_NOT_FOUND)
    current_status = plant.current_status
    next_status = current_status.get_next_status()

    logging.debug(plant_status_request)

    avaerage_score = sum([int(q.answer) for q in plant_status_request.questions]) / len(
        plant_status_request.questions
    )

    background_tasks.add_task(
        document_telemetry_data,
        plant_id,
        current_user.id,
        f"""
            planted_at: {plant.planted_at}
            seed_category: {plant.category}
            seed_specific: {plant.specific_name}
            current_status: {plant.current_status}
            next_status: {plant.current_status.get_next_status()}
            user_koppen_climate_classification: {current_user.koppen_climate_classification}
            questions: {plant_status_request.questions}
        """,
        session,
    )

    increment_score = 0
    is_transitioned: bool = False
    # check if message contains the word "yes"
    logging.debug(f"average score: {avaerage_score}")
    if avaerage_score < 3 and (
        plant_status_request.otp_question is None
        or plant_status_request.otp_question == "000000"
    ):
        is_transitioned = True
        # initiate the transition to the next status
        session.exec(
            update(Plant).where(Plant.id == plant_id).values(current_status=next_status)
        )
        # create an event for the transition
        session.add(
            Event(
                user_id=current_user.id,
                plant_id=plant_id,
                event_type=EventType.GROWING,
                event_date=date.today().isoformat(),
                event_description=f"Changed status from {current_status} to {next_status}",
            )
        )

        # also let the user gain some score weighted by the next status
        match next_status:
            case PlantStatus.GERMINATION:
                increment_score = 10
            case PlantStatus.SEEDLING:
                increment_score = 20
            case PlantStatus.VEGETATIVE_PHASE:
                increment_score = 30
            case PlantStatus.REPRODUCTIVE_PHASE:
                increment_score = 40
            case PlantStatus.RETURNED_SEEDS:
                increment_score = 150

        session.exec(
            update(User)
            .where(User.id == current_user.id)
            .values(score=User.score + increment_score)
        )
        session.commit()

    return PlantStatusUpdateResponse(
        increment_score=increment_score,
        is_transitioned=is_transitioned,
    )


@router.get("/{plant_id}/help", response_model=PlantStatusHelpResponse)
async def get_plant_help(
    plant_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Get help for the plant
    """
    plant = session.exec(
        select(
            Plant.planted_at, Seed.category, Seed.specific_name, Plant.current_status
        )
        .where(Plant.id == plant_id)
        .join(Seed, Seed.id == Plant.seed_id)
    ).first()
    if plant is None:
        # plant does not count for the user return 404 not found
        return Response(status_code=status.HTTP_404_NOT_FOUND)
    events = session.exec(
        select(Event)
        .where(Event.user_id == current_user.id, Event.plant_id == plant_id)
        .order_by(Event.event_date.desc())
    ).all()

    messages_telemetry = await prompt_general_plant_help_messages(
        f"""
            planted_at: {plant.planted_at}
            seed_category: {plant.category}
            seed_specific: {plant.specific_name}
            current_status: {plant.current_status}
            user_koppen_climate_classification: {current_user.koppen_climate_classification}
            events: {events}
        """
    )

    return PlantStatusHelpResponse(text=messages_telemetry)


@router.get("/{plant_id}/events", response_model=list[Event])
async def get_users_me_events(
    plant_id: int,
    order: str = "desc",
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Get the events of the current user
    """
    order_by_clause = (
        Event.event_date.desc() if order == "desc" else Event.event_date.asc()
    )
    return session.exec(
        select(Event)
        .where(Event.user_id == current_user.id, Event.plant_id == plant_id)
        .order_by(order_by_clause)
    ).all()
