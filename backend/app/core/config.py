from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Parking Access MVP"
    app_env: str = "development"
    app_host: str = "127.0.0.1"
    app_port: int = 8000
    default_hourly_rate: int = 1000

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()