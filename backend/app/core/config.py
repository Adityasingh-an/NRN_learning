from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    OPENROUTER_API_KEY: str = ""
    ADMIN_EMAIL: str = ""
    ADMIN_PASS: str = ""
    
    # Reads variables from a .env file if available
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()
