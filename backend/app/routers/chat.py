"""
Chat Router — Conversational agent endpoint
"""
import json
import re
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse

from app.models.chat import ChatRequest, ChatResponse
from app.services.auth import get_current_user

router = APIRouter()

UPLOAD_ROOT = Path(__file__).resolve().parents[2] / "data" / "uploads"


def _get_uploaded_file(audit_id: str) -> Path | None:
    audit_dir = UPLOAD_ROOT / audit_id
    if not audit_dir.exists():
        return None

    return next((path for path in audit_dir.iterdir() if path.is_file()), None)


def _read_pdf_text(path: Path) -> str:
    try:
        from pypdf import PdfReader

        reader = PdfReader(str(path))
        return "\n".join(page.extract_text() or "" for page in reader.pages)
    except Exception:
        return ""


def _summarize_age_from_text(text: str) -> str | None:
    age_group_rows = re.findall(
        r"\b(\d{2}-\d{2})\s+(\d+)\s+([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\s+(-?[0-9.]+)\s+([A-Za-z_]+)",
        text,
    )

    if age_group_rows:
        summaries = []
        for group, applicants, selection_rate, _tpr, _fpr, di_ratio, eo_gap, severity in age_group_rows:
            summaries.append(
                f"{group}: {applicants} applicants, selection rate {float(selection_rate) * 100:.0f}%, "
                f"DI ratio {di_ratio}, EO gap {eo_gap}, severity {severity.replace('_', ' ')}"
            )

        return "Here are the age-group details from the uploaded PDF: " + "; ".join(summaries) + "."

    age_matches = re.findall(r"\bage\s*[:=-]?\s*(\d{1,3})\b", text, flags=re.IGNORECASE)
    ages = [int(value) for value in age_matches if 0 < int(value) < 120]

    if not ages:
        return None

    plural = "s" if len(ages) != 1 else ""
    return (
        f"I found {len(ages)} age value{plural} in the uploaded PDF text. "
        f"The age range is {min(ages)} to {max(ages)}, with an average of {sum(ages) / len(ages):.1f}."
    )


def _summarize_age_from_table(path: Path) -> str:
    import pandas as pd

    if path.suffix.lower() == ".csv":
        data = pd.read_csv(path)
    else:
        data = pd.read_excel(path)

    age_columns = [
        column for column in data.columns
        if "age" in str(column).strip().lower()
    ]

    if not age_columns:
        available_columns = ", ".join(str(column) for column in data.columns[:8])
        return (
            "I could not find an age column in the uploaded table. "
            f"The visible columns include: {available_columns}."
        )

    lines = []
    for column in age_columns:
        numeric_age = pd.to_numeric(data[column], errors="coerce").dropna()

        if numeric_age.empty:
            lines.append(f"{column}: present, but I could not convert its values into numeric ages.")
            continue

        lines.append(
            f"{column}: {len(numeric_age)} filled values, min {numeric_age.min():.0f}, "
            f"max {numeric_age.max():.0f}, average {numeric_age.mean():.1f}."
        )

    return "Here are the age details from the uploaded source: " + " ".join(lines)


def _build_chat_answer(audit_id: str, message: str) -> str:
    uploaded_file = _get_uploaded_file(audit_id)

    if not uploaded_file:
        return (
            "I could not find an uploaded source for this audit yet. "
            "Please upload a CSV or PDF first, then ask again."
        )

    if "age" in message.lower():
        if uploaded_file.suffix.lower() in {".csv", ".xlsx"}:
            try:
                return _summarize_age_from_table(uploaded_file)
            except Exception:
                return "I found the uploaded table, but I could not read its age details."

        if uploaded_file.suffix.lower() == ".pdf":
            text = _read_pdf_text(uploaded_file)
            age_summary = _summarize_age_from_text(text)

            if age_summary:
                return age_summary

            return (
                f"I checked {uploaded_file.name}, but I could not find structured age values in the PDF text. "
                "For exact age statistics, upload the underlying CSV/XLSX dataset with an age column."
            )

    return (
        f"I found your uploaded source: {uploaded_file.name}. "
        "Ask about a specific column or metric, for example age, gender, disparate impact, or mitigation options."
    )


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
        content = _build_chat_answer(audit_id, request.message)
        yield f"data: {json.dumps({'type': 'text', 'content': content})}\n\n"
        yield f"data: {json.dumps({'type': 'done'})}\n\n"

    return StreamingResponse(stream_response(), media_type="text/event-stream")
