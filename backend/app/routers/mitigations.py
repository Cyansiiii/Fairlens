"""
Mitigations Router — Recommendations + apply-fix
"""
from fastapi import APIRouter, Depends, HTTPException

from app.models.audit import MitigationOption, ApplyFixRequest, ApplyFixResponse
from app.services.auth import get_current_user

router = APIRouter()


@router.get("/audits/{audit_id}/mitigations")
async def get_mitigations(
    audit_id: str,
    user=Depends(get_current_user),
):
    """List of recommended fixes with projected improvements."""
    # TODO: Phase 4 — Mitigation engine recommendations
    return {"audit_id": audit_id, "mitigations": []}


@router.post("/audits/{audit_id}/apply-fix", response_model=ApplyFixResponse)
async def apply_fix(
    audit_id: str,
    request: ApplyFixRequest,
    user=Depends(get_current_user),
):
    """
    Apply a specific mitigation, re-scan, return updated FairScore.
    """
    # TODO: Phase 4 — Apply AIF360 algorithm, re-scan
    raise HTTPException(501, "Mitigation engine not yet implemented")
