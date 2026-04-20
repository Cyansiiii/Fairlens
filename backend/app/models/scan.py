"""
Scan Pydantic Models
"""
from typing import Optional
from pydantic import BaseModel, Field


class MetricResult(BaseModel):
    metric_name: str
    value: float
    threshold: float
    passed: bool
    severity: str  # critical, high, medium, low
    description: str
    affected_groups: list[str] = []


class BiasFlag(BaseModel):
    flag_id: str
    metric_name: str
    severity: str
    description: str
    affected_attribute: str
    affected_groups: list[str]
    recommendation: str


class ScanSummary(BaseModel):
    total_metrics: int
    passed: int
    failed: int
    critical_flags: int
    high_flags: int


class ScanTriggerResponse(BaseModel):
    audit_id: str
    task_id: str
    status: str


class ScanResultsResponse(BaseModel):
    audit_id: str
    fair_score: float
    grade: str
    risk_level: str
    summary: ScanSummary
    metrics: list[MetricResult]
    bias_flags: list[BiasFlag]
    demographic_breakdown: dict = {}


class SimulationRequest(BaseModel):
    attribute: str
    n_pairs: int = Field(default=100, ge=10, le=10000)


class SimulationPair(BaseModel):
    pair_id: str
    original_record: dict
    modified_record: dict
    original_prediction: float
    modified_prediction: float
    prediction_delta: float


class SimulationResponse(BaseModel):
    audit_id: str
    attribute: str
    n_pairs: int
    discrimination_gap: float
    pairs: list[SimulationPair]
    statistically_significant: bool
    p_value: float
