from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter
from app.schemas.session import EntryRequest, EntryResponse

router = APIRouter()


@router.post("/entry", response_model=EntryResponse)
def create_entry_session(payload: EntryRequest) -> EntryResponse:
    _ = payload.entry_gate_id

    return EntryResponse(
        session_token=str(uuid4()),
        status="ACTIVE",
        payment_status="NONE",
        entry_time=datetime.now(timezone.utc),
        message="Sesión creada y barrera de entrada autorizada",
    )