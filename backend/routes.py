"""
routes.py
---------
API routes for AI Email Generator.
"""

import logging

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse

from models import GenerateRequest, GenerateResponse
from services import (
    AIServiceError,
    GeminiService,
    get_gemini_service,
)


logger = logging.getLogger("ai_email_generator")

router = APIRouter()


def validate_payload(payload: GenerateRequest):
    """
    Validate required fields depending on action type.
    """

    if payload.action_type == "send":

        if not payload.sender_name:
            raise HTTPException(
                status_code=400,
                detail="Sender name is required."
            )

        if not payload.receiver_name:
            raise HTTPException(
                status_code=400,
                detail="Recipient name is required."
            )

        if not payload.email_purpose:
            raise HTTPException(
                status_code=400,
                detail="Email purpose is required."
            )


    elif payload.action_type == "reply":

        if not payload.original_email:
            raise HTTPException(
                status_code=400,
                detail="Original email is required."
            )

        if not payload.reply_content:
            raise HTTPException(
                status_code=400,
                detail="Reply content is required."
            )


@router.post(
    "/generate",
    response_model=GenerateResponse,
    summary="Generate email"
)
async def generate_email(
    payload: GenerateRequest,
    ai_service: GeminiService = Depends(get_gemini_service),
):

    validate_payload(payload)

    try:

        result = await ai_service.generate_email(
            action_type=payload.action_type,

            sender_name=payload.sender_name,
            receiver_name=payload.receiver_name,
            email_purpose=payload.email_purpose,

            original_email=payload.original_email,
            reply_content=payload.reply_content,

            tone=payload.tone.value,
            length=payload.length.value,
        )


        return GenerateResponse(
            reply=result
        )


    except AIServiceError as exc:

        logger.error(exc)

        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=str(exc)
        )


    except Exception as exc:

        logger.exception(exc)

        raise HTTPException(
            status_code=500,
            detail="Unexpected server error."
        )



@router.post(
    "/generate/stream",
    summary="Generate email with streaming response"
)
async def generate_email_stream(
    payload: GenerateRequest,
    ai_service: GeminiService = Depends(get_gemini_service),
):

    validate_payload(payload)


    async def event_generator():

        try:

            async for chunk in ai_service.generate_email_stream(
                action_type=payload.action_type,

                sender_name=payload.sender_name,
                receiver_name=payload.receiver_name,
                email_purpose=payload.email_purpose,

                original_email=payload.original_email,
                reply_content=payload.reply_content,

                tone=payload.tone.value,
                length=payload.length.value,
            ):

                yield chunk


        except AIServiceError as exc:

            logger.error(exc)

            yield f"[ERROR] {exc}"


        except Exception as exc:

            logger.exception(exc)

            yield (
                "[ERROR] "
                "Unexpected error while generating email."
            )


    return StreamingResponse(
        event_generator(),
        media_type="text/plain"
    )