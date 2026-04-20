"""
Scan Tasks — Async Celery tasks for bias scanning and simulation.

Tasks emit progress events to Redis every 10% of scan completion.
"""
import json
import redis
import os
from app.tasks.celery_app import celery_app

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")


def get_redis_client():
    return redis.from_url(REDIS_URL)


def emit_progress(audit_id: str, progress: int, status: str, details: dict = None):
    """Emit scan progress event to Redis for SSE streaming."""
    r = get_redis_client()
    event = {
        "audit_id": audit_id,
        "progress": progress,
        "status": status,
        "details": details or {},
    }
    r.publish(f"scan_progress:{audit_id}", json.dumps(event))
    r.set(f"scan_state:{audit_id}", json.dumps(event), ex=3600)


@celery_app.task(bind=True, name="run_bias_scan")
def run_bias_scan(self, audit_id: str, config: dict):
    """
    Run full bias scan as an async Celery task.
    Emits progress events every 10%.
    """
    try:
        emit_progress(audit_id, 0, "starting")

        # TODO: Phase 1 — Load data from GCS, run BiasScanner
        emit_progress(audit_id, 10, "loading_data")
        emit_progress(audit_id, 20, "detecting_columns")
        emit_progress(audit_id, 30, "checking_disparate_impact")
        emit_progress(audit_id, 40, "checking_demographic_parity")
        emit_progress(audit_id, 50, "checking_equalized_odds")
        emit_progress(audit_id, 60, "checking_individual_fairness")
        emit_progress(audit_id, 70, "checking_proxies")
        emit_progress(audit_id, 80, "checking_calibration")
        emit_progress(audit_id, 90, "calculating_fair_score")
        emit_progress(audit_id, 100, "completed")

        return {"audit_id": audit_id, "status": "completed"}

    except Exception as e:
        emit_progress(audit_id, -1, "failed", {"error": str(e)})
        raise


@celery_app.task(bind=True, name="run_simulation_task")
def run_simulation_task(self, audit_id: str, attribute: str, n_pairs: int):
    """Run adversarial simulation as an async Celery task."""
    try:
        emit_progress(audit_id, 0, "starting_simulation")
        # TODO: Phase 3 — SimulationEngine integration
        emit_progress(audit_id, 100, "simulation_completed")
        return {"audit_id": audit_id, "status": "completed"}
    except Exception as e:
        emit_progress(audit_id, -1, "simulation_failed", {"error": str(e)})
        raise
