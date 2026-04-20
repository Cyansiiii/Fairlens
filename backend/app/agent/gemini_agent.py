"""
Gemini Agent — LangChain + Gemini 1.5 Pro agent setup via Vertex AI.

Maintains multi-turn conversation memory per audit session.
Implements streaming responses for SSE.
"""
from typing import Optional, AsyncGenerator

# TODO: Phase 2 — Full implementation
# from langchain.agents import create_tool_calling_agent, AgentExecutor
# from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain.memory import ConversationBufferMemory
# from app.agent.tools import get_agent_tools
# from app.agent.prompts import SYSTEM_PROMPT


class FairLensAgent:
    """Conversational AI agent powered by Gemini 1.5 Pro."""

    def __init__(self, audit_id: str):
        self.audit_id = audit_id
        # TODO: Phase 2 — Initialize LangChain agent with tools

    async def chat(self, message: str) -> AsyncGenerator[str, None]:
        """
        Process user message and yield streaming response chunks.
        """
        # TODO: Phase 2 — Full LangChain agent implementation
        yield "I'm the FairLens AI assistant. I can help you understand bias in your dataset. "
        yield "This feature will be fully implemented in Phase 2."

    def get_conversation_history(self) -> list[dict]:
        """Get conversation history for this audit session."""
        # TODO: Phase 2 — LangChain memory retrieval
        return []
