from fastapi import APIRouter, HTTPException
from app.core.storage import sessions

router = APIRouter()


@router.get("/sessions/{token}")
def get_session(token: str):
    session = sessions.get(token)

    if not session:
        raise HTTPException(status_code=404, detail="Sesión no encontrada")

    return session