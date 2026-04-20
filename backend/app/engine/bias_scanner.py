"""
Bias Scanner — AIF360 wrapper with all 8 fairness metrics + Indian demographic extensions.

Implements:
1. Disparate Impact Ratio (flag if < 0.8 or > 1.25)
2. Demographic Parity Difference (flag if > 0.1)
3. Equalized Odds (flag if TPR/FPR difference > 0.1)
4. Individual Fairness Score (flag if < 0.85)
5. Proxy Feature Detection (flag correlation > 0.7)
6. Calibration Difference (flag if > 5% gap)
7. Counterfactual Fairness (flag if outcome changes when attribute flipped)
8. Representation Score (flag any group < 5% representation)
"""
import pandas as pd
import numpy as np
from typing import Optional

from app.models.scan import MetricResult, BiasFlag


# Indian demographic categories
INDIAN_CASTE_CATEGORIES = ["General", "OBC", "SC", "ST", "EWS"]
INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
]
INDIAN_UTS = [
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
]
INDIAN_LANGUAGES = [
    "Assamese", "Bengali", "Bodo", "Dogri", "Gujarati", "Hindi", "Kannada",
    "Kashmiri", "Konkani", "Maithili", "Malayalam", "Manipuri", "Marathi",
    "Nepali", "Odia", "Punjabi", "Sanskrit", "Santali", "Sindhi", "Tamil",
    "Telugu", "Urdu",
]
LOCALITY_TYPES = ["urban", "peri-urban", "rural"]

# Metric thresholds
DEFAULT_THRESHOLDS = {
    "disparate_impact": {"min": 0.8, "max": 1.25},
    "demographic_parity": {"max": 0.1},
    "equalized_odds_tpr": {"max": 0.1},
    "equalized_odds_fpr": {"max": 0.1},
    "individual_fairness": {"min": 0.85},
    "proxy_correlation": {"max": 0.7},
    "calibration_difference": {"max": 0.05},
    "counterfactual_fairness": {"max_change": 0.0},
    "representation": {"min_pct": 0.05},
}


class BiasScanner:
    """Core bias detection engine wrapping AIF360 with Indian demographic extensions."""

    def __init__(
        self,
        data: pd.DataFrame,
        sensitive_attributes: list[str],
        target_column: str,
        thresholds: Optional[dict] = None,
    ):
        self.data = data
        self.sensitive_attributes = sensitive_attributes
        self.target_column = target_column
        self.thresholds = thresholds or DEFAULT_THRESHOLDS
        self.results: list[MetricResult] = []
        self.bias_flags: list[BiasFlag] = []

    def detect_column_types(self) -> dict[str, str]:
        """Auto-detect column types and potential sensitive attributes."""
        type_map = {}
        for col in self.data.columns:
            if self.data[col].dtype in ["int64", "float64"]:
                type_map[col] = "numeric"
            elif self.data[col].dtype == "object":
                n_unique = self.data[col].nunique()
                if n_unique <= 20:
                    type_map[col] = "categorical"
                else:
                    type_map[col] = "text"
            elif self.data[col].dtype == "bool":
                type_map[col] = "boolean"
            else:
                type_map[col] = str(self.data[col].dtype)
        return type_map

    def detect_sensitive_columns(self) -> list[str]:
        """Auto-detect potential sensitive attributes from column names."""
        sensitive_keywords = [
            "gender", "sex", "race", "ethnicity", "religion", "caste",
            "age", "disability", "nationality", "language", "state",
            "marital", "name", "first_name", "last_name", "surname",
        ]
        detected = []
        for col in self.data.columns:
            col_lower = col.lower().replace("_", " ").replace("-", " ")
            for keyword in sensitive_keywords:
                if keyword in col_lower:
                    detected.append(col)
                    break
        return detected

    def run_full_scan(self) -> tuple[list[MetricResult], list[BiasFlag]]:
        """Run all 8 fairness metrics and return results + flags."""
        # TODO: Phase 1 — Implement each metric using AIF360
        # Each method populates self.results and self.bias_flags
        self._check_disparate_impact()
        self._check_demographic_parity()
        self._check_equalized_odds()
        self._check_individual_fairness()
        self._check_proxy_features()
        self._check_calibration()
        self._check_counterfactual_fairness()
        self._check_representation()
        return self.results, self.bias_flags

    def _check_disparate_impact(self):
        """Metric 1: Disparate Impact Ratio — flag if < 0.8 or > 1.25"""
        pass  # TODO: Phase 1

    def _check_demographic_parity(self):
        """Metric 2: Demographic Parity Difference — flag if > 0.1"""
        pass  # TODO: Phase 1

    def _check_equalized_odds(self):
        """Metric 3: Equalized Odds (TPR + FPR) — flag if difference > 0.1"""
        pass  # TODO: Phase 1

    def _check_individual_fairness(self):
        """Metric 4: Individual Fairness Score — flag if < 0.85"""
        pass  # TODO: Phase 1

    def _check_proxy_features(self):
        """Metric 5: Proxy Feature Detection — flag correlation > 0.7"""
        pass  # TODO: Phase 1

    def _check_calibration(self):
        """Metric 6: Calibration Difference — flag if > 5% gap"""
        pass  # TODO: Phase 1

    def _check_counterfactual_fairness(self):
        """Metric 7: Counterfactual Fairness — flag outcome change on attribute flip"""
        pass  # TODO: Phase 1

    def _check_representation(self):
        """Metric 8: Representation Score — flag any group < 5%"""
        pass  # TODO: Phase 1
