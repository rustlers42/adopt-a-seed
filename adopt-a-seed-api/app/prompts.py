from async_lru import alru_cache
from ollama import AsyncClient, ChatResponse

from .settings import settings


@alru_cache(maxsize=32)
async def prompt_check_growth_stage_eligibility(content):
    messages = [
        {
            "role": "system",
            "content": "You are an expert assistant providing advice on plant growth. You will be given a set of questions along with corresponding ratings that reflect the current health and status of a plant. Ratings are provided numerically as follows: 1: Very Good, 2: Good, 3: Neutral, 4: Bad, 5: Very Bad Based on these ratings, determine if the plant is ready to transition to the next growth stage. Respond strictly with 'yes' if the plant is ready, or 'No' if it is not. Do not provide additional explanations or commentary.",
        },
        {
            "role": "user",
            "content": content,
        },
    ]
    response: ChatResponse = await AsyncClient(host=settings.ollama_url).chat(
        model=settings.ollama_model,
        messages=messages,
    )
    messages_reccomendation_transition: str = response["message"]["content"].strip()
    return messages_reccomendation_transition


@alru_cache(maxsize=32)
async def prompt_provide_growth_recommendations(content):
    messages = [
        {
            "role": "system",
            "content": "You are an assistant providing practical advice for plant growers. You will receive a series of questions along with numerical ratings describing the current health status of a plant. Ratings are given as follows: 1: Very Good, 2: Good, 3: Neutral, 4: Bad, 5: Very Bad Based on these ratings, compile the most important key points highlighting areas for improvement. Provide general, actionable hints on how the user can enhance plant health or address issues indicated by lower ratings. Do not provide overly specific instructions, and do not ask any follow-up questions.",
        },
        {
            "role": "user",
            "content": content,
        },
    ]
    response: ChatResponse = await AsyncClient(host=settings.ollama_url).chat(
        model=settings.ollama_model,
        messages=messages,
    )
    messages_telemetry: str = response["message"]["content"].strip()
    return messages_telemetry


@alru_cache(maxsize=32)
async def prompt_general_plant_help_messages(content):
    messages = [
        {
            "role": "system",
            "content": "You are an expert assistant providing advice on plant cultivation. You will receive a chronological list of events related to a plant's growth process. Based on this event history, your about the plant and the climate based on the koppen_climate_classification provide concise, actionable recommendations highlighting areas for potential improvement. Offer up to 5 short suggestions. Do not ask any follow-up questions.",
        },
        {
            "role": "user",
            "content": content,
        },
    ]
    response: ChatResponse = await AsyncClient(host=settings.ollama_url).chat(
        model=settings.ollama_model,
        messages=messages,
    )
    messages_telemetry: str = response["message"]["content"].strip()
    return messages_telemetry
