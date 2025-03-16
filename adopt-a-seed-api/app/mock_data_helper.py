import logging
import random
from datetime import date, timedelta

from sqlmodel import Session, select

from .models import Event, Plant, Seed, SeedDatabase, SeedToSeedDatabase, User
from .models.EventType import EventType
from .models.PlantStatus import PlantStatus
from .oauth2_helper import get_password_hash


def setup_mock_data(session: Session):
    if session.exec(select(User)).first() is None:
        logging.info("creating default users because there are none")
        user = [
            User(
                email="admin@admin.de",
                username="admin",
                hashed_password=get_password_hash("admin"),
                score=0,
            ),
            User(
                email="user@user.de",
                username="user",
                hashed_password=get_password_hash("user"),
                score=500,
            ),
            User(
                email="alice@example.com",
                username="alice",
                hashed_password=get_password_hash("alicepass"),
                score=150,
            ),
            User(
                email="bob@example.com",
                username="bob",
                hashed_password=get_password_hash("bobpass"),
                score=320,
            ),
            User(
                email="carol@example.com",
                username="carol",
                hashed_password=get_password_hash("carolpass"),
                score=480,
            ),
        ]
        session.add_all(user)
        session.commit()

    if session.exec(select(Seed)).first() is None:
        logging.info("creating default seeds because there are none")
        seed_data = [
            (
                "Tomato",
                [
                    "Siberian Tomato",
                    "Cherry Tomato",
                    "Heirloom Tomato",
                    "San Marzano Tomato",
                    "Brandywine Tomato",
                    "Beefsteak Tomato",
                ],
            ),
            (
                "Potato",
                [
                    "Yukon Gold Potato",
                    "Russet Potato",
                    "Fingerling Potato",
                ],
            ),
            (
                "Spinach",
                [
                    "Bloomsdale Spinach",
                    "Savoy Spinach",
                    "Baby Spinach",
                ],
            ),
            (
                "Pepper",
                [
                    "Bell Pepper",
                    "Jalapeno Pepper",
                    "Ghost Pepper",
                    "Poblano Pepper",
                ],
            ),
            (
                "Lettuce",
                [
                    "Butterhead Lettuce",
                    "Red Romaine Lettuce",
                    "Iceberg Lettuce",
                    "Oak Leaf Lettuce",
                ],
            ),
            (
                "Carrot",
                [
                    "Imperator Carrot",
                    "Rainbow Carrot Mix",
                    "Danvers Half-Long Carrot",
                    "Purple Haze Carrot",
                ],
            ),
            (
                "Cucumber",
                [
                    "Marketmore Cucumber",
                    "English Cucumber",
                    "Persian Cucumber",
                ],
            ),
            (
                "Kale",
                [
                    "Lacinato Kale",
                    "Red Russian Kale",
                    "Curly Kale",
                ],
            ),
            (
                "Zucchini",
                [
                    "Black Beauty Zucchini",
                    "Golden Zucchini",
                ],
            ),
            (
                "Spinach",
                [
                    "Bloomsdale Spinach",
                    "Matador Spinach",
                ],
            ),
            (
                "Mint",
                [
                    "Spearmint",
                    "Peppermint",
                    "Chocolate Mint",
                    "Mojito Mint",
                ],
            ),
            (
                "Basil",
                [
                    "Sweet Basil",
                    "Thai Basil",
                    "Purple Basil",
                    "Genovese Basil",
                ],
            ),
            (
                "Oregano",
                [
                    "Greek Oregano",
                    "Italian Oregano",
                ],
            ),
            (
                "Rosemary",
                [
                    "Tuscan Blue Rosemary",
                    "Common Rosemary",
                ],
            ),
            (
                "Thyme",
                [
                    "English Thyme",
                    "Lemon Thyme",
                ],
            ),
            (
                "Parsley",
                [
                    "Curly Parsley",
                    "Italian Flat Leaf Parsley",
                ],
            ),
            (
                "Chives",
                [
                    "Garlic Chives",
                    "Onion Chives",
                ],
            ),
            (
                "Dill",
                [
                    "Bouquet Dill",
                    "Fernleaf Dill",
                ],
            ),
            (
                "Cilantro",
                [
                    "Slow Bolt Cilantro",
                    "Vietnamese Cilantro",
                ],
            ),
            (
                "Sage",
                [
                    "Common Sage",
                    "Purple Sage",
                    "Golden Sage",
                ],
            ),
            (
                "Mint",
                [
                    "Peppermint",
                    "Chocolate Mint",
                    "Apple Mint",
                ],
            ),
            (
                "Beans",
                [
                    "Green Beans",
                    "Scarlet Runner Beans",
                    "Wax Beans",
                ],
            ),
            (
                "Squash",
                [
                    "Butternut Squash",
                    "Acorn Squash",
                    "Delicata Squash",
                ],
            ),
            (
                "Strawberry",
                [
                    "Alpine Strawberry",
                    "June Bearing Strawberry",
                    "Everbearing Strawberry",
                ],
            ),
            (
                "Radish",
                [
                    "Cherry Belle Radish",
                    "French Breakfast Radish",
                ],
            ),
            (
                "Eggplant",
                [
                    "Black Beauty Eggplant",
                    "Japanese Eggplant",
                ],
            ),
            (
                "Parsley",
                [
                    "Curly Parsley",
                    "Italian Flat Leaf Parsley",
                ],
            ),
            (
                "Thyme",
                [
                    "English Thyme",
                    "Lemon Thyme",
                ],
            ),
            (
                "Lavender",
                [
                    "English Lavender",
                    "French Lavender",
                ],
            ),
        ]
        seeds = [
            Seed(category=cat, specific_name=spec)
            for cat, specs in seed_data
            for spec in specs
        ]
        session.add_all(seeds)
        session.commit()

    if session.exec(select(SeedDatabase)).first() is None:
        logging.info("creating default seed databases because there are none")
        seed_databases = [
            SeedDatabase(name="Manhattan Seed Database", contact="example@example.com"),
            SeedDatabase(name="Brooklyn Seed Bank", contact="contact@brooklynseed.com"),
            SeedDatabase(name="Queens Urban Seeds", contact="info@queensseeds.org"),
            SeedDatabase(name="Bronx Green Seeds", contact="support@bronxgreens.com"),
            SeedDatabase(
                name="Staten Island Seed Vault",
                contact="admin@statenislandseeds.com",
            ),
            SeedDatabase(
                name="Chicago Seed Repository", contact="contact@chicagoseeds.com"
            ),
            SeedDatabase(
                name="San Francisco Seed Library", contact="info@sfseedlibrary.org"
            ),
            SeedDatabase(
                name="Los Angeles Seed Exchange",
                contact="support@laseedexchange.com",
            ),
            SeedDatabase(
                name="Seattle Seed Collective", contact="admin@seattleseeds.com"
            ),
            SeedDatabase(
                name="Portland Seed Network", contact="contact@portlandseeds.net"
            ),
        ]
        session.add_all(seed_databases)
        session.commit()

    if session.exec(select(SeedToSeedDatabase)).first() is None:
        logging.info(
            "creating default seed to seed database mapping because there are none"
        )
        count_seeds = len(session.exec(select(Seed)).all())
        count_seed_databases = len(session.exec(select(SeedDatabase)).all())

        for i in range(1, count_seed_databases + 1):
            # select randomly 10 seeds
            seeds_for_seed_database = random.sample(range(1, count_seeds + 1), 10)
            seed_to_seed_database_mapping = [
                SeedToSeedDatabase(seed_id=seed_id, seed_database_id=i)
                for seed_id in seeds_for_seed_database
            ]
            session.add_all(seed_to_seed_database_mapping)
        session.commit()

    if session.exec(select(Event)).first() is None:
        logging.info("creating default events because there are none")
        events = [
            Event(
                event_type=EventType.GLOBAL_NEWS,
                event_date=date(2025, 1, 1).isoformat(),
                event_description="New Year's Day",
            ),
            Event(
                event_type=EventType.GLOBAL_NEWS,
                event_date=date(2024, 4, 22).isoformat(),
                event_description="Earth Day: Community gardening efforts celebrated globally.",
            ),
            Event(
                event_type=EventType.GLOBAL_NEWS,
                event_date=date(2024, 6, 5).isoformat(),
                event_description="World Environment Day: Awareness about sustainable agriculture emphasized.",
            ),
            Event(
                event_type=EventType.GLOBAL_NEWS,
                event_date=date(2024, 10, 16).isoformat(),
                event_description="World Food Day: Discussions on sustainable agriculture practices.",
            ),
            Event(
                event_type=EventType.GROWING,
                event_date=date(2025, 1, 3).isoformat(),
                user_id=1,
                plant_id=1,
                event_description=f"Changed status from {PlantStatus.PENDING.value} to {PlantStatus.GERMINATION.value}",
            ),
            Event(
                event_type=EventType.GROWING,
                event_date=date(2025, 1, 7).isoformat(),
                user_id=1,
                plant_id=1,
                event_description=f"Changed status from {PlantStatus.GERMINATION.value} to {PlantStatus.SEEDLING.value}",
            ),
            Event(
                event_type=EventType.GROWING,
                event_date=date(2025, 1, 17).isoformat(),
                user_id=1,
                plant_id=1,
                event_description=f"Changed status from {PlantStatus.SEEDLING.value} to {PlantStatus.VEGETATIVE_PHASE.value}",
            ),
            Event(
                event_type=EventType.GROWING,
                event_date=date(2025, 2, 16).isoformat(),
                user_id=1,
                plant_id=1,
                event_description=f"Changed status from {PlantStatus.VEGETATIVE_PHASE.value} to {PlantStatus.REPRODUCTIVE_PHASE.value}",
            ),
            Event(
                event_type=EventType.GROWING,
                event_date=date(2025, 3, 15).isoformat(),
                user_id=1,
                plant_id=1,
                event_description=f"Changed status from {PlantStatus.REPRODUCTIVE_PHASE.value} to {PlantStatus.RETURNED_SEEDS.value}",
            ),
        ]
        session.add_all(events)
        session.commit()

        if session.exec(select(Plant)).first() is None:
            logging.info("creating default plants because there are none")
            users = session.exec(select(User)).all()
            seeds = session.exec(select(Seed)).all()
            seed_databases = session.exec(select(SeedDatabase)).all()

            plant_statuses = [
                PlantStatus.PENDING,
                PlantStatus.GERMINATION,
                PlantStatus.SEEDLING,
                PlantStatus.VEGETATIVE_PHASE,
                PlantStatus.REPRODUCTIVE_PHASE,
                PlantStatus.RETURNED_SEEDS,
            ]

            for user in users:
                selected_seeds = random.sample(seeds, 5)
                random_statuses = random.sample(plant_statuses, 5)

                for seed, status in zip(selected_seeds, random_statuses):
                    planting_base_date = date(2024, 12, random.randint(1, 31))
                    planted_at = (
                        None
                        if status == PlantStatus.PENDING
                        else planting_base_date.isoformat()
                    )
                    seed_database = random.choice(seed_databases + [None])

                    plant = Plant(
                        seed_id=seed.id,
                        seed_database_id=seed_database.id if seed_database else None,
                        user_id=user.id,
                        current_status=status,
                        planted_at=planted_at,
                    )
                    session.add(plant)
                    session.commit()  # Commit to generate plant.id

                    # Generate realistic events if not pending
                    if status != PlantStatus.PENDING:
                        event_dates = {
                            PlantStatus.GERMINATION: random.randint(3, 7),
                            PlantStatus.SEEDLING: random.randint(10, 20),
                            PlantStatus.VEGETATIVE_PHASE: random.randint(30, 40),
                            PlantStatus.REPRODUCTIVE_PHASE: random.randint(60, 85),
                            PlantStatus.RETURNED_SEEDS: random.randint(95, 180),
                        }

                        status_order = [
                            PlantStatus.PENDING,
                            PlantStatus.GERMINATION,
                            PlantStatus.SEEDLING,
                            PlantStatus.VEGETATIVE_PHASE,
                            PlantStatus.REPRODUCTIVE_PHASE,
                            PlantStatus.RETURNED_SEEDS,
                        ]

                        planted_at_date = planting_base_date

                        for target_status in range(1, len(status_order)):
                            days_after_planting = event_dates[
                                status_order[target_status]
                            ]
                            event_date = planted_at_date + timedelta(
                                days=days_after_planting
                            )

                            event = Event(
                                event_type=EventType.GROWING,
                                event_date=event_date.isoformat(),
                                user_id=user.id,
                                plant_id=plant.id,
                                event_description=f"Changed status from {status_order[target_status-1].value} to {status_order[target_status].value}",
                            )
                            session.add(event)
                            session.commit()

                            if status_order[target_status] == status:
                                break  # Stop creating events once current plant status is reached
