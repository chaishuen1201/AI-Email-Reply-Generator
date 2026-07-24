"""
main.py
-------
Application entry point for the FastAPI backend.
"""

import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from routes import router as api_router
from services import AIServiceError

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger("ai_email_reply_generator")

app = FastAPI(
    title="AI Email Reply Generator API",
    description="Backend service that generates AI-powered email replies using Google Gemini.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "https://ai-email-reply-generator-sand.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(AIServiceError)
async def ai_service_error_handler(request: Request, exc: AIServiceError) -> JSONResponse:
    logger.error("AI service error: %s", exc)
    return JSONResponse(status_code=502, content={"detail": str(exc)})


app.include_router(api_router)


@app.get("/", tags=["Health"])
async def root() -> dict:
    return {"message": "AI Email Reply Generator API is running."}


@app.get("/health", tags=["Health"])
async def health_check() -> dict:
    return {"status": "ok"}