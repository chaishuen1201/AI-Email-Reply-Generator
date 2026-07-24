"""
models.py
----------
Defines all Pydantic models used by the application.
"""

from enum import Enum
from typing import Literal

from pydantic import BaseModel, Field, field_validator


class Tone(str, Enum):
    PROFESSIONAL = "Professional"
    FRIENDLY = "Friendly"
    FORMAL = "Formal"
    CASUAL = "Casual"
    EMPATHETIC = "Empathetic"


class Length(str, Enum):
    SHORT = "Short"
    MEDIUM = "Medium"
    LONG = "Long"


class GenerateRequest(BaseModel):
    """
    Shared request model for both:
    - Compose a new email
    - Reply to an email
    """

    action_type: Literal["send", "reply"]

    sender_name: str | None = None
    receiver_name: str | None = None
    email_purpose: str | None = None

    original_email: str | None = None
    reply_content: str | None = None

    tone: Tone = Tone.PROFESSIONAL
    length: Length = Length.MEDIUM

    @field_validator(
        "sender_name",
        "receiver_name",
        "email_purpose",
        "original_email",
        "reply_content",
        mode="before",
    )
    @classmethod
    def strip_strings(cls, value):
        if value is None:
            return None
        return value.strip()

    @field_validator("action_type")
    @classmethod
    def validate_action(cls, value):
        if value not in ("send", "reply"):
            raise ValueError("action_type must be 'send' or 'reply'")
        return value


class GenerateResponse(BaseModel):
    reply: str


class ErrorResponse(BaseModel):
    detail: str