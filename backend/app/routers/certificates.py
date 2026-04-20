"""
Certificates Router — FairScore certificate generation
"""
from fastapi import APIRouter, Depends, HTTPException

from app.models.certificate import CertificateResponse
from app.services.auth import get_current_user

router = APIRouter()


@router.get("/audits/{audit_id}/certificate", response_model=CertificateResponse)
async def get_certificate(
    audit_id: str,
    user=Depends(get_current_user),
):
    """Returns JSON certificate + signed GCS URL to downloadable PDF."""
    # TODO: Phase 5 — Generate PDF, upload to GCS, return signed URL
    raise HTTPException(501, "Certificate generation not yet implemented")
