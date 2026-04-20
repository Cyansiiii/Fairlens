"""
Audit Pydantic Models
"""
from datetime import datetime
from typing import Optional
from enum import Enum

from pydantic import BaseModel, Field


class RegulatoryFramework(str, Enum):
    EU_AI_ACT = "eu_ai_act"
    INDIA_DPDP = "india_dpdp"
    NYC_LL144 = "nyc_ll144"
    ALL = "all"


class AuditStatus(str, Enum):
    UPLOADED = "uploaded"
    CONFIGURED = "configured"
    SCANNING = "scanning"
    COMPLETED = "completed"
    FAILED = "failed"


class Severity(str, Enum):
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class UploadResponse(BaseModel):
    audit_id: str
    filename: str
    file_size: int
    preview_rows: list[dict]
    detected_sensitive_columns: list[str]
    column_types: dict[str, str]


class AuditConfigureRequest(BaseModel):
    sensitive_attributes: list[str]
    target_column: str
    regulatory_framework: RegulatoryFramework = RegulatoryFramework.ALL
    metric_thresholds: Optional[dict[str, float]] = None


class AuditCreate(BaseModel):
    audit_id: str
    user_id: str
    filename: str
    file_size: int
    gcs_path: str
    status: AuditStatus = AuditStatus.UPLOADED
    created_at: datetime = Field(default_factory=datetime.utcnow)


class AuditResponse(BaseModel):
    audit_id: str
    filename: str
    status: AuditStatus
    fair_score: Optional[float] = None
    created_at: datetime
    updated_at: Optional[datetime] = None


class FairScoreBreakdown(BaseModel):
    representation: float = Field(ge=0, le=100)
    individual_fairness: float = Field(ge=0, le=100)
    group_fairness: float = Field(ge=0, le=100)
    counterfactual_fairness: float = Field(ge=0, le=100)


class FairScoreResult(BaseModel):
    overall_score: float = Field(ge=0, le=100)
    grade: str  # A, B, C, D, F
    breakdown: FairScoreBreakdown
    risk_level: str  # low, medium, high, critical


class MitigationOption(BaseModel):
    mitigation_id: str
    name: str
    technique_type: str  # pre-processing, in-processing, post-processing
    description: str
    projected_fair_score: float
    accuracy_tradeoff: float
    target_bias_flags: list[str]


class ApplyFixRequest(BaseModel):
    mitigation_id: str


class ApplyFixResponse(BaseModel):
    audit_id: str
    mitigation_id: str
    previous_fair_score: float
    new_fair_score: float
    accuracy_change: float
    status: str
