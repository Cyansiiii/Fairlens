"""
BigQuery Service — Append-only audit trail logging.
"""
import os
from typing import Optional
from datetime import datetime


class BigQueryService:
    """Immutable audit trail in BigQuery for compliance analytics."""

    def __init__(self):
        self.dataset_id = os.getenv("BIGQUERY_DATASET_ID", "fairlens_audit_trail")
        self._client = None

    @property
    def client(self):
        if self._client is None:
            try:
                from google.cloud import bigquery
                self._client = bigquery.Client()
            except Exception:
                self._client = None
        return self._client

    async def log_audit_event(
        self,
        audit_id: str,
        event_type: str,
        user_id: str,
        details: dict,
    ) -> None:
        """Append an audit event to BigQuery. Immutable — never updated or deleted."""
        # TODO: Phase 1 — BigQuery insert
        pass

    async def get_audit_trail(self, audit_id: str) -> list[dict]:
        """Get all events for an audit."""
        # TODO: Phase 1
        return []
