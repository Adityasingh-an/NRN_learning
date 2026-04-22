from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    OPENROUTER_API_KEY: str = ""
    ADMIN_EMAIL: str = ""
    ADMIN_PASS: str = ""
    SECRET_KEY: str = "NRN_SUPER_SECRET_KEY_REPLACE_IN_PRODUCTION"
    ALLOWED_ORIGINS: str = "*" # Comma separated origins
    BACKEND_URL: str = "http://localhost:8000"

    
    # Reads variables from a .env file if available
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()
