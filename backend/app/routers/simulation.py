"""
Simulation Router — Adversarial simulation endpoints
"""
from fastapi import APIRouter, Depends, HTTPException

from app.models.scan import SimulationRequest, SimulationResponse
from app.services.auth import get_current_user

router = APIRouter()


@router.post("/audits/{audit_id}/simulate", response_model=SimulationResponse)
async def run_simulation(
    audit_id: str,
    request: SimulationRequest,
    user=Depends(get_current_user),
):
    """
    Run adversarial simulation: attribute + n_pairs →
    discrimination gap scores + synthetic pair results.
    """
    # TODO: Phase 3 — SDV synthetic pair generation + model inference
    return SimulationResponse(
        audit_id=audit_id,
        attribute=request.attribute,
        n_pairs=request.n_pairs,
        discrimination_gap=0.0,
        pairs=[],
        statistically_significant=False,
        p_value=1.0,
    )
