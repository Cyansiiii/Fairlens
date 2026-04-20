"""
Chat Pydantic Models
"""
from typing import Optional
from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None


class ToolCallDisplay(BaseModel):
    tool_name: str
    tool_input: dict
    tool_output: Optional[dict] = None
    status: str = "pending"


class ChatResponse(BaseModel):
    message: str
    conversation_id: str
    tool_calls: list[ToolCallDisplay] = []
    suggested_prompts: list[str] = []
