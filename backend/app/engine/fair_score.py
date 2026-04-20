"""
FairScore Calculator — Composite fairness score (0–100).

Weighted average of normalised sub-scores across 4 dimensions:
- Representation (25%): representation score
- Individual Fairness (25%): individual fairness + calibration
- Group Fairness (30%): disparate impact + demographic parity + equalized odds
- Counterfactual Fairness (20%): counterfactual + proxy detection
"""
from typing import Optional
from app.models.audit import FairScoreResult, FairScoreBreakdown
from app.models.scan import MetricResult


DIMENSION_WEIGHTS = {
    "representation": 0.25,
    "individual_fairness": 0.25,
    "group_fairness": 0.30,
    "counterfactual_fairness": 0.20,
}

METRIC_TO_DIMENSION = {
    "representation": "representation",
    "individual_fairness": "individual_fairness",
    "calibration_difference": "individual_fairness",
    "disparate_impact": "group_fairness",
    "demographic_parity": "group_fairness",
    "equalized_odds_tpr": "group_fairness",
    "equalized_odds_fpr": "group_fairness",
    "counterfactual_fairness": "counterfactual_fairness",
    "proxy_correlation": "counterfactual_fairness",
}


def calculate_fair_score(metrics: list[MetricResult]) -> FairScoreResult:
    """
    Calculate composite FairScore from individual metric results.
    Returns overall score (0-100), grade, breakdown, and risk level.
    """
    # TODO: Phase 1 — Implement actual scoring algorithm
    dimension_scores = {
        "representation": 100.0,
        "individual_fairness": 100.0,
        "group_fairness": 100.0,
        "counterfactual_fairness": 100.0,
    }

    overall = sum(
        dimension_scores[dim] * weight
        for dim, weight in DIMENSION_WEIGHTS.items()
    )

    grade = _score_to_grade(overall)
    risk_level = _score_to_risk(overall)

    return FairScoreResult(
        overall_score=round(overall, 1),
        grade=grade,
        breakdown=FairScoreBreakdown(**dimension_scores),
        risk_level=risk_level,
    )


def _score_to_grade(score: float) -> str:
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 50:
        return "D"
    return "F"


def _score_to_risk(score: float) -> str:
    if score >= 80:
        return "low"
    elif score >= 50:
        return "medium"
    elif score >= 30:
        return "high"
    return "critical"
