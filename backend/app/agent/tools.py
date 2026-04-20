"""
Agent Tools — 8 Gemini function-calling tools for the bias audit agent.

1. run_fairness_scan(audit_id) — triggers or retrieves full scan results
2. get_demographic_breakdown(audit_id, attribute) — outcome rates by group
3. generate_counterfactual(audit_id, record_id, attribute, new_value) — flip attribute, show change
4. explain_prediction(audit_id, record_id) — LIME/SHAP explanation
5. get_proxy_features(audit_id) — high-correlation proxy features
6. run_simulation(audit_id, attribute, n_pairs) — adversarial simulation
7. get_mitigation_options(audit_id) — recommended fixes
8. generate_audit_summary(audit_id) — plain-language executive summary
"""

# TODO: Phase 2 — Implement as LangChain tools
# from langchain.tools import tool


def run_fairness_scan(audit_id: str) -> dict:
    """Triggers or retrieves full scan results for an audit."""
    # TODO: Phase 2
    return {"status": "not_implemented"}


def get_demographic_breakdown(audit_id: str, attribute: str) -> dict:
    """Get outcome rates broken down by demographic group."""
    # TODO: Phase 2
    return {"status": "not_implemented"}


def generate_counterfactual(
    audit_id: str, record_id: str, attribute: str, new_value: str
) -> dict:
    """Flip one attribute in a record and show prediction change."""
    # TODO: Phase 2
    return {"status": "not_implemented"}


def explain_prediction(audit_id: str, record_id: str) -> dict:
    """Generate LIME/SHAP explanation for a specific record."""
    # TODO: Phase 2
    return {"status": "not_implemented"}


def get_proxy_features(audit_id: str) -> dict:
    """Get features with high correlation to protected attributes."""
    # TODO: Phase 2
    return {"status": "not_implemented"}


def run_simulation(audit_id: str, attribute: str, n_pairs: int = 100) -> dict:
    """Trigger adversarial simulation with synthetic pairs."""
    # TODO: Phase 2
    return {"status": "not_implemented"}


def get_mitigation_options(audit_id: str) -> dict:
    """List recommended fixes with projected FairScore improvement."""
    # TODO: Phase 2
    return {"status": "not_implemented"}


def generate_audit_summary(audit_id: str) -> dict:
    """Generate plain-language executive summary of the full audit."""
    # TODO: Phase 2
    return {"status": "not_implemented"}
