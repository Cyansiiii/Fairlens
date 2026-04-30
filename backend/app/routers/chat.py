"""
Chat Router — Conversational agent endpoint
"""
import json

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
        content = (
            f"I received your question about audit {audit_id}: \"{request.message}\". "
            "The live agent is not connected yet, but you can use the findings above to review "
            "disparate impact, proxy-heavy features, and mitigation options."
        )
        yield f"data: {json.dumps({'type': 'text', 'content': content})}\n\n"
        yield f"data: {json.dumps({'type': 'done'})}\n\n"

    return StreamingResponse(stream_response(), media_type="text/event-stream")
