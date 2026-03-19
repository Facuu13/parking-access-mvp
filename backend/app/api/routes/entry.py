from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter
from app.schemas.session import EntryRequest, EntryResponse
from app.core.storage import sessions

router = APIRouter()


@router.post("/entry", response_model=EntryResponse)
def create_entry_session(payload: EntryRequest) -> EntryResponse:
    token = str(uuid4())
    entry_time = datetime.now(timezone.utc)

    session_data = {
        "session_token": token,
        "status": "ACTIVE",
        "payment_status": "NONE",
        "entry_time": entry_time,
        "exit_time": None,
        "duration_minutes": None,
        "hourly_rate": 1000,
        "total_amount": None,
        "opened_on_entry": False,
        "opened_on_exit": False,
    }

    # 👉 Guardamos en memoria
    sessions[token] = session_data

    return EntryResponse(
        session_token=token,
        status="ACTIVE",
        payment_status="NONE",
        entry_time=entry_time,
        message="Sesión creada y barrera de entrada autorizada",
    )