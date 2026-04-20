"""
Badge Generator — SVG + JSON-LD shareable FairScore badge.
"""


def generate_badge_svg(
    fair_score: float,
    grade: str,
    audit_id: str,
    timestamp: str,
) -> str:
    """
    Generate an SVG badge with FairLens logo + FairScore + timestamp.
    Includes embedded JSON-LD metadata for schema.org structured data.
    """
    # TODO: Phase 5 — SVG badge generation
    color = "#059669" if fair_score >= 80 else "#D97706" if fair_score >= 50 else "#DC2626"

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="200" height="40">
  <rect width="200" height="40" rx="6" fill="{color}"/>
  <text x="100" y="25" text-anchor="middle" fill="white" font-family="Inter" font-size="14" font-weight="bold">
    FairScore: {fair_score:.0f} ({grade})
  </text>
</svg>"""

    return svg
