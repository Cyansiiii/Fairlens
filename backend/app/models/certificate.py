"""
Certificate Pydantic Models
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class ComplianceCheck(BaseModel):
    framework: str
    article: str
    description: str
    status: str  # passed, failed, partial
    details: str


class ComplianceChecklist(BaseModel):
    eu_ai_act: list[ComplianceCheck] = []
    india_dpdp: list[ComplianceCheck] = []
    nyc_ll144: list[ComplianceCheck] = []


class BiasDetected(BaseModel):
    metric_name: str
    severity: str
    description: str
    affected_groups: list[str]


class MitigationApplied(BaseModel):
    name: str
    technique_type: str
    before_score: float
    after_score: float


class CertificateResponse(BaseModel):
    audit_id: str
    fair_score: float
    grade: str
    risk_level: str
    issued_at: datetime = Field(default_factory=datetime.utcnow)
    methodology_hash: str
    breakdown: dict
    compliance: ComplianceChecklist
    biases_detected: list[BiasDetected] = []
    mitigations_applied: list[MitigationApplied] = []
    pdf_url: Optional[str] = None
    badge_svg: Optional[str] = None
