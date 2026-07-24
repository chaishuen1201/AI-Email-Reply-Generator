"""
services.py
-----------
Business logic for AI Email Generator.

Supports:
- Compose a new email
- Reply to an email
- Streaming
"""

import logging
import os

from dotenv import load_dotenv
from google import genai

from prompts import (
    build_compose_prompt,
    build_reply_prompt,
)

load_dotenv()

logger = logging.getLogger("ai_email_generator")

GEMINI_MODEL_NAME = "gemini-3.6-flash"


class AIServiceError(Exception):
    pass


class GeminiService:

    def __init__(self):

        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise AIServiceError(
                "GEMINI_API_KEY is not set."
            )

        self.client = genai.Client(api_key=api_key)

    def _build_prompt(
        self,
        action_type,
        sender_name,
        receiver_name,
        email_purpose,
        original_email,
        reply_content,
        tone,
        length,
    ):

        if action_type == "send":
            return build_compose_prompt(
                sender_name=sender_name,
                receiver_name=receiver_name,
                email_purpose=email_purpose,
                tone=tone,
                length=length,
            )

        return build_reply_prompt(
            original_email=original_email,
            reply_content=reply_content,
            tone=tone,
            length=length,
        )

    async def generate_email(
        self,
        action_type,
        sender_name=None,
        receiver_name=None,
        email_purpose=None,
        original_email=None,
        reply_content=None,
        tone="Professional",
        length="Medium",
    ):

        prompt = self._build_prompt(
            action_type,
            sender_name,
            receiver_name,
            email_purpose,
            original_email,
            reply_content,
            tone,
            length,
        )

        try:

            response = await self.client.aio.models.generate_content(
                model=GEMINI_MODEL_NAME,
                contents=prompt,
            )

        except Exception as exc:
            logger.exception(exc)
            raise AIServiceError(
                f"Gemini API failed: {exc}"
            ) from exc

        text = getattr(response, "text", None)

        if not text:
            raise AIServiceError(
                "AI returned an empty response."
            )

        return text.strip()

    async def generate_email_stream(
        self,
        action_type,
        sender_name=None,
        receiver_name=None,
        email_purpose=None,
        original_email=None,
        reply_content=None,
        tone="Professional",
        length="Medium",
    ):

        prompt = self._build_prompt(
            action_type,
            sender_name,
            receiver_name,
            email_purpose,
            original_email,
            reply_content,
            tone,
            length,
        )

        try:

            stream = await self.client.aio.models.generate_content_stream(
                model=GEMINI_MODEL_NAME,
                contents=prompt,
            )

            received_text = False

            async for chunk in stream:

                text = getattr(chunk, "text", None)

                if text:
                    received_text = True
                    yield text

            if not received_text:
                raise AIServiceError(
                    "AI returned an empty response."
                )

        except Exception as exc:

            logger.exception(exc)

            raise AIServiceError(
                f"Gemini API failed: {exc}"
            ) from exc


_gemini_service = None


def get_gemini_service():

    global _gemini_service

    if _gemini_service is None:
        _gemini_service = GeminiService()

    return _gemini_service