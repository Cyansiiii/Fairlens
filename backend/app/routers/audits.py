"""
Audits Router — Upload, configure, scan, results, stream
"""
import uuid
from typing import Optional

from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Query
from fastapi.responses import StreamingResponse

from app.models.audit import (
    AuditCreate,
    AuditResponse,
    AuditConfigureRequest,
    UploadResponse,
)
from app.models.scan import ScanTriggerResponse, ScanResultsResponse
from app.services.auth import get_current_user

router = APIRouter()


@router.post("/audits/upload", response_model=UploadResponse)
async def upload_dataset(
    file: UploadFile = File(...),
    user=Depends(get_current_user),
):
    """
    Multipart upload of CSV/XLSX/PKL/ONNX/JSON.
    Returns upload_id + 50-row preview + auto-detected sensitive columns.
    """
    # Validate file type
    allowed_extensions = {".csv", ".xlsx", ".pkl", ".onnx", ".json"}
    ext = "." + file.filename.split(".")[-1].lower() if file.filename else ""
    if ext not in allowed_extensions:
        raise HTTPException(400, f"Unsupported file type: {ext}")

    # Check file size (500MB for datasets, 2GB for models)
    max_size = 2 * 1024 * 1024 * 1024 if ext in {".pkl", ".onnx"} else 500 * 1024 * 1024
    content = await file.read()
    if len(content) > max_size:
        raise HTTPException(413, "File exceeds maximum upload size")

    audit_id = str(uuid.uuid4())

    # TODO: Phase 1 — Upload to GCS, parse preview, detect sensitive columns, PII scan
    return UploadResponse(
        audit_id=audit_id,
        filename=file.filename or "unknown",
        file_size=len(content),
        preview_rows=[],
        detected_sensitive_columns=[],
        column_types={},
    )


@router.post("/audits/{audit_id}/configure")
async def configure_audit(
    audit_id: str,
    config: AuditConfigureRequest,
    user=Depends(get_current_user),
):
    """Set sensitive_attributes, regulatory_framework, metric_thresholds."""
    # TODO: Phase 1 — Save config to Firestore
    return {"audit_id": audit_id, "status": "configured", "config": config.model_dump()}


@router.post("/audits/{audit_id}/scan", response_model=ScanTriggerResponse)
async def trigger_scan(
    audit_id: str,
    user=Depends(get_current_user),
):
    """Trigger async Celery scan. Returns task_id."""
    # TODO: Phase 1 — Dispatch Celery task
    task_id = str(uuid.uuid4())
    return ScanTriggerResponse(audit_id=audit_id, task_id=task_id, status="queued")


@router.get("/audits/{audit_id}/results", response_model=ScanResultsResponse)
async def get_scan_results(
    audit_id: str,
    user=Depends(get_current_user),
):
    """Full scan results: FairScore, all metric scores, bias flags, severity."""
    # TODO: Phase 1 — Fetch from Firestore
    raise HTTPException(404, "Scan results not found")


@router.get("/audits/{audit_id}/stream")
async def stream_scan_progress(
    audit_id: str,
    user=Depends(get_current_user),
):
    """SSE stream: scan progress 0–100%, live metric completions."""

    async def event_generator():
        # TODO: Phase 1 — Read progress from Redis
        yield f"data: {{'progress': 0, 'status': 'starting'}}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")


@router.get("/audits")
async def list_audits(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    user=Depends(get_current_user),
):
    """Paginated list of user's audits with FairScore history."""
    # TODO: Phase 1 — Fetch from Firestore with pagination
    return {"audits": [], "page": page, "page_size": page_size, "total": 0}
