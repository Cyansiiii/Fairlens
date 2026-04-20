"""
Google Cloud Storage Service — File upload/download/delete.
"""
import os
from typing import Optional


class StorageService:
    """GCS file storage with AES-256 encryption at rest."""

    def __init__(self):
        self.bucket_name = os.getenv("GCS_BUCKET_NAME", "fairlens-uploads")
        self._client = None

    @property
    def client(self):
        if self._client is None:
            try:
                from google.cloud import storage
                self._client = storage.Client()
            except Exception:
                self._client = None
        return self._client

    async def upload_file(
        self, file_content: bytes, destination: str, content_type: str = "application/octet-stream"
    ) -> str:
        """Upload a file to GCS. Returns the GCS path."""
        # TODO: Phase 1 — GCS upload implementation
        return f"gs://{self.bucket_name}/{destination}"

    async def download_file(self, gcs_path: str) -> bytes:
        """Download a file from GCS."""
        # TODO: Phase 1
        return b""

    async def delete_file(self, gcs_path: str) -> bool:
        """Delete a file from GCS."""
        # TODO: Phase 1
        return True

    async def generate_signed_url(
        self, gcs_path: str, expiration_minutes: int = 60
    ) -> str:
        """Generate a signed URL for temporary file access."""
        # TODO: Phase 1
        return f"https://storage.googleapis.com/{self.bucket_name}/{gcs_path}?signed=true"
