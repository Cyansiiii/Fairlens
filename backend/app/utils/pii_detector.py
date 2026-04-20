"""
PII Detector — Email, phone, Aadhaar pattern detection.

All uploaded files must be scanned for PII before processing.
"""
import re
from typing import Optional
import pandas as pd


# PII patterns
EMAIL_PATTERN = re.compile(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")
PHONE_PATTERN = re.compile(r"(?:\+91[\-\s]?)?[6-9]\d{9}")
AADHAAR_PATTERN = re.compile(r"\d{4}\s\d{4}\s\d{4}")
PAN_PATTERN = re.compile(r"[A-Z]{5}\d{4}[A-Z]")


class PIIDetector:
    """Scan datasets for personally identifiable information."""

    def __init__(self, data: pd.DataFrame):
        self.data = data

    def scan(self) -> dict:
        """
        Scan all columns for PII patterns.
        Returns dict of column_name -> list of PII types found.
        """
        results = {}
        for col in self.data.columns:
            if self.data[col].dtype != "object":
                continue

            pii_types = []
            sample = self.data[col].dropna().head(100).astype(str)

            if sample.str.contains(EMAIL_PATTERN).any():
                pii_types.append("email")
            if sample.str.contains(PHONE_PATTERN).any():
                pii_types.append("phone")
            if sample.str.contains(AADHAAR_PATTERN).any():
                pii_types.append("aadhaar")
            if sample.str.contains(PAN_PATTERN).any():
                pii_types.append("pan")

            if pii_types:
                results[col] = pii_types

        return results

    def has_pii(self) -> bool:
        """Quick check if any PII is present."""
        return len(self.scan()) > 0
