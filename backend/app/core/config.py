"""
Core configuration settings for CounselFlow API
"""

import os
from typing import List, Optional
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """Application settings"""
    
    # Application
    PROJECT_NAME: str = "CounselFlow"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "Modular Legal Support"
    ENVIRONMENT: str = Field(default="development", env="ENVIRONMENT")
    DEBUG: bool = Field(default=True, env="DEBUG")
    
    # Security
    SECRET_KEY: str = Field(default="your-secret-key-change-in-production", env="SECRET_KEY")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Enhanced Security Settings
    REFRESH_TOKEN_EXPIRE_DAYS: int = Field(default=7, env="REFRESH_TOKEN_EXPIRE_DAYS")
    PASSWORD_MIN_LENGTH: int = Field(default=12, env="PASSWORD_MIN_LENGTH")
    PASSWORD_REQUIRE_SPECIAL: bool = Field(default=True, env="PASSWORD_REQUIRE_SPECIAL")
    MFA_ISSUER_NAME: str = Field(default="CounselFlow Legal Support", env="MFA_ISSUER_NAME")
    
    # Session Security
    SESSION_TIMEOUT_MINUTES: int = Field(default=60, env="SESSION_TIMEOUT_MINUTES")
    MAX_LOGIN_ATTEMPTS: int = Field(default=5, env="MAX_LOGIN_ATTEMPTS")
    LOCKOUT_DURATION_MINUTES: int = Field(default=30, env="LOCKOUT_DURATION_MINUTES")
    
    # Encryption Settings
    ENCRYPTION_ALGORITHM: str = Field(default="AES-256-GCM", env="ENCRYPTION_ALGORITHM")
    CLIENT_ISOLATION_ENABLED: bool = Field(default=True, env="CLIENT_ISOLATION_ENABLED")
    PRIVILEGE_PROTECTION_LEVEL: str = Field(default="military_grade", env="PRIVILEGE_PROTECTION_LEVEL")
    
    # Database
    DATABASE_URL: str = Field(
        default="postgresql://counselflow:counselflow_password@localhost:5432/counselflow",
        env="DATABASE_URL"
    )
    
    # Redis (for caching and sessions)
    REDIS_URL: str = Field(default="redis://localhost:6379", env="REDIS_URL")
    
    # AI Services
    OPENAI_API_KEY: Optional[str] = Field(default=None, env="OPENAI_API_KEY")
    ANTHROPIC_API_KEY: Optional[str] = Field(default=None, env="ANTHROPIC_API_KEY")
    GEMINI_API_KEY: Optional[str] = Field(default=None, env="GEMINI_API_KEY")
    
    # LangChain Settings
    LANGCHAIN_TRACING_V2: bool = Field(default=False, env="LANGCHAIN_TRACING_V2")
    LANGCHAIN_API_KEY: Optional[str] = Field(default=None, env="LANGCHAIN_API_KEY")
    
    # LlamaIndex Settings
    LLAMA_INDEX_CACHE_DIR: str = Field(default="./cache", env="LLAMA_INDEX_CACHE_DIR")
    
    # File Storage
    UPLOAD_FOLDER: str = Field(default="./uploads", env="UPLOAD_FOLDER")
    MAX_UPLOAD_SIZE: int = Field(default=50 * 1024 * 1024, env="MAX_UPLOAD_SIZE")  # 50MB
    ALLOWED_EXTENSIONS: List[str] = [
        "pdf", "doc", "docx", "txt", "csv", "xlsx", "xls", "ppt", "pptx"
    ]
    
    # Email Configuration
    SMTP_HOST: Optional[str] = Field(default=None, env="SMTP_HOST")
    SMTP_PORT: int = Field(default=587, env="SMTP_PORT")
    SMTP_USERNAME: Optional[str] = Field(default=None, env="SMTP_USERNAME")
    SMTP_PASSWORD: Optional[str] = Field(default=None, env="SMTP_PASSWORD")
    SMTP_USE_TLS: bool = Field(default=True, env="SMTP_USE_TLS")
    
    # Logging
    LOG_LEVEL: str = Field(default="INFO", env="LOG_LEVEL")
    LOG_FILE: str = Field(default="counselflow.log", env="LOG_FILE")
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = Field(default=100, env="RATE_LIMIT_PER_MINUTE")
    
    # Compliance & Audit
    AUDIT_LOG_RETENTION_DAYS: int = Field(default=2555, env="AUDIT_LOG_RETENTION_DAYS")  # 7 years
    ENCRYPTION_KEY: Optional[str] = Field(default=None, env="ENCRYPTION_KEY")
    
    # Jurisdictions supported
    SUPPORTED_JURISDICTIONS: List[str] = [
        "US-NY", "US-CA", "US-FL", "US-TX", "US-IL",
        "UK", "EU-DE", "EU-FR", "CA-ON", "AU-NSW"
    ]
    
    # Languages supported
    SUPPORTED_LANGUAGES: List[str] = ["en", "fr", "es", "de"]
    
    # Document Security
    DOCUMENT_ENCRYPTION_ENABLED: bool = Field(default=True, env="DOCUMENT_ENCRYPTION_ENABLED")
    
    # Azure OpenAI
    AZURE_OPENAI_ENDPOINT: Optional[str] = Field(default=None, env="AZURE_OPENAI_ENDPOINT")
    AZURE_OPENAI_KEY: Optional[str] = Field(default=None, env="AZURE_OPENAI_KEY")
    
    # LangChain Cache
    LANGCHAIN_CACHE_DIR: str = Field(default="./cache/langchain", env="LANGCHAIN_CACHE_DIR")
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


# Global settings instance
settings = Settings()
