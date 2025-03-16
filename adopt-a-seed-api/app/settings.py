from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    # Database settings
    database_url: str

    # OAuth2 settings
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int

    # AI
    ollama_url: str = "http://localhost:11434"
    ollama_model: str = "gemma3:4b"


settings = Settings()
