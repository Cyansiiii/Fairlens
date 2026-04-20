"""
Chat Router — Conversational agent endpoint
"""
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse

from app.models.chat import ChatRequest, ChatResponse
from app.services.auth import get_current_user

router = APIRouter()


@router.post("/audits/{audit_id}/chat")
async def chat_with_agent(
    audit_id: str,
    request: ChatRequest,
    user=Depends(get_current_user),
):
    """
    Send a message to the Gemini-powered bias audit agent.
    Returns streamed response via SSE.
    """

    async def stream_response():
        # TODO: Phase 2 — LangChain agent with Gemini 1.5 Pro
        yield f"data: {{'type': 'text', 'content': 'Agent response placeholder'}}\n\n"
        yield f"data: {{'type': 'done'}}\n\n"

    return StreamingResponse(stream_response(), media_type="text/event-stream")
