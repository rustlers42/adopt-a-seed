from fastapi import APIRouter, Depends, Response, status
from sqlmodel import Session

from ..database import get_session
from ..models.Seed import Seed

router = APIRouter()


@router.get("", response_model=list[Seed])
async def get_seeds(*, session: Session = Depends(get_session)):
    """
    Get all seeds
    """
    return session.query(Seed).all()


# function to fill the database with some initial data
@router.post("/fill", tags=["mock"])
async def fill_seeds(*, session: Session = Depends(get_session)):
    """
    Fill the database with some initial data
    """
    seeds = [
        Seed(category="Tomato", specific_name="Siberian Tomato"),
        Seed(category="Tomato", specific_name="Cherry Tomato"),
        Seed(category="Potato", specific_name="Yukon Gold Potato"),
        Seed(category="Potato", specific_name="Russet Potato"),
        Seed(category="Carrot", specific_name="Nantes Carrot"),
        Seed(category="Carrot", specific_name="Purple Carrot"),
        Seed(category="Lettuce", specific_name="Butterhead Lettuce"),
        Seed(category="Lettuce", specific_name="Romaine Lettuce"),
        Seed(category="Basil", specific_name="Genovese Basil"),
        Seed(category="Basil", specific_name="Thai Basil"),
        Seed(category="Oregano", specific_name="Greek Oregano"),
        Seed(category="Oregano", specific_name="Italian Oregano"),
        Seed(category="Pepper", specific_name="Bell Pepper"),
        Seed(category="Pepper", specific_name="Jalapeno Pepper"),
        Seed(category="Cucumber", specific_name="Marketmore Cucumber"),
        Seed(category="Cucumber", specific_name="Lemon Cucumber"),
        Seed(category="Spinach", specific_name="Bloomsdale Spinach"),
        Seed(category="Spinach", specific_name="Savoy Spinach"),
        Seed(category="Kale", specific_name="Lacinato Kale"),
        Seed(category="Kale", specific_name="Curly Kale"),
        Seed(category="Zucchini", specific_name="Black Beauty Zucchini"),
        Seed(category="Zucchini", specific_name="Golden Zucchini"),
        Seed(category="Rosemary", specific_name="Tuscan Blue Rosemary"),
        Seed(category="Rosemary", specific_name="Common Rosemary"),
        Seed(category="Thyme", specific_name="English Thyme"),
        Seed(category="Thyme", specific_name="Lemon Thyme"),
        Seed(category="Mint", specific_name="Spearmint"),
        Seed(category="Mint", specific_name="Peppermint"),
        Seed(category="Parsley", specific_name="Italian Flat Leaf Parsley"),
        Seed(category="Parsley", specific_name="Curly Parsley"),
        Seed(category="Chives", specific_name="Garlic Chives"),
        Seed(category="Chives", specific_name="Onion Chives"),
        Seed(category="Dill", specific_name="Fernleaf Dill"),
        Seed(category="Dill", specific_name="Bouquet Dill"),
        Seed(category="Cilantro", specific_name="Slow Bolt Cilantro"),
        Seed(category="Cilantro", specific_name="Vietnamese Cilantro"),
        Seed(category="Sage", specific_name="Common Sage"),
        Seed(category="Sage", specific_name="Purple Sage"),
    ]
    session.add_all(seeds)
    session.commit()
    return Response(content="OK", status_code=status.HTTP_200_OK)
