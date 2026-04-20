"""
South Asian Name Database — Name-to-demographic lookup.

Uses a 500+ name database with probability distributions for:
- Caste category (General, OBC, SC, ST, EWS)
- Religion (Hindu, Muslim, Christian, Sikh, Buddhist, Jain, Other)
- Region/State association
"""
import json
import os
from typing import Optional


NAME_DB_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "..",
    "data",
    "south_asian_names.json",
)


class NameDB:
    """South Asian name-to-demographic lookup."""

    def __init__(self, db_path: Optional[str] = None):
        self.db_path = db_path or NAME_DB_PATH
        self._db: Optional[dict] = None

    @property
    def db(self) -> dict:
        if self._db is None:
            self._load()
        return self._db

    def _load(self):
        """Load name database from JSON file."""
        try:
            with open(self.db_path, "r") as f:
                self._db = json.load(f)
        except FileNotFoundError:
            self._db = {"first_names": {}, "last_names": {}}

    def lookup_name(self, first_name: str, last_name: str = "") -> dict:
        """
        Look up demographic probability distributions for a name.
        Returns caste, religion, and region distributions.
        """
        result = {
            "first_name": first_name,
            "last_name": last_name,
            "caste_dist": {},
            "religion_dist": {},
            "region_dist": {},
        }

        fn_data = self.db.get("first_names", {}).get(first_name, {})
        ln_data = self.db.get("last_names", {}).get(last_name, {})

        if fn_data:
            result["caste_dist"] = fn_data.get("caste_dist", {})
            result["religion_dist"] = fn_data.get("religion_dist", {})
            result["region_dist"] = fn_data.get("region_dist", {})

        # Last name often more predictive — override if available
        if ln_data:
            result["caste_dist"] = ln_data.get("caste_dist", result["caste_dist"])
            result["region_dist"] = ln_data.get("region_dist", result["region_dist"])

        return result

    def get_names_by_demographic(
        self, caste: Optional[str] = None, religion: Optional[str] = None
    ) -> list[str]:
        """Get names matching a specific demographic profile."""
        matches = []
        for name, data in self.db.get("first_names", {}).items():
            if caste and data.get("caste_dist", {}).get(caste, 0) > 0.3:
                matches.append(name)
            elif religion and data.get("religion_dist", {}).get(religion, 0) > 0.3:
                matches.append(name)
        return matches
