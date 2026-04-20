"""
Firebase Auth Service — Token verification and user management.
"""
import os
from typing import Optional

from fastapi import Depends, HTTPException, Header
from pydantic import BaseModel


class UserInfo(BaseModel):
    uid: str
    email: Optional[str] = None
    name: Optional[str] = None


_firebase_initialized = False


def initialize_firebase():
    """Initialize Firebase Admin SDK."""
    global _firebase_initialized
    if _firebase_initialized:
        return

    try:
        import firebase_admin
        from firebase_admin import credentials

        cred_json = os.getenv("FIREBASE_SERVICE_ACCOUNT_KEY_JSON")
        project_id = os.getenv("FIREBASE_PROJECT_ID")

        if cred_json:
            import json
            cred_dict = json.loads(cred_json)
            cred = credentials.Certificate(cred_dict)
            firebase_admin.initialize_app(cred)
        elif project_id:
            firebase_admin.initialize_app(options={"projectId": project_id})
        else:
            # Development mode — no Firebase auth
            pass

        _firebase_initialized = True
    except Exception as e:
        print(f"Firebase initialization skipped: {e}")
        _firebase_initialized = True  # Allow dev mode without Firebase


async def get_current_user(
    authorization: Optional[str] = Header(None),
) -> UserInfo:
    """
    Validate Firebase JWT token from Authorization header.
    In dev mode (no Firebase), returns a mock user.
    """
    # Dev mode — no auth required
    if os.getenv("FAIRLENS_DEV_MODE", "true").lower() == "true":
        return UserInfo(
            uid="dev-user-001",
            email="dev@fairlens.local",
            name="Developer",
        )

    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(401, "Missing or invalid authorization header")

    token = authorization.split("Bearer ")[1]

    try:
        from firebase_admin import auth
        decoded = auth.verify_id_token(token)
        return UserInfo(
            uid=decoded["uid"],
            email=decoded.get("email"),
            name=decoded.get("name"),
        )
    except Exception as e:
        raise HTTPException(401, f"Invalid authentication token")
