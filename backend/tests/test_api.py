"""Tests for API endpoints."""
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_check():
    """Test health endpoint returns 200."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "fairlens-api"


def test_list_audits():
    """Test list audits endpoint."""
    response = client.get("/api/v1/audits")
    assert response.status_code == 200
