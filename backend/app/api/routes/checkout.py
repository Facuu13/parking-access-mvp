from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException
from app.schemas.session import CheckoutRequest
from app.core.storage import sessions

router = APIRouter()


@router.post("/sessions/{token}/checkout")
def checkout_session(token: str, payload: CheckoutRequest):
    session = sessions.get(token)

    # 1. validar existencia
    if not session:
        raise HTTPException(status_code=404, detail="Sesión no encontrada")

    # 2. validar estado
    if session["status"] != "ACTIVE":
        raise HTTPException(
            status_code=400,
            detail="La sesión no está en estado ACTIVE",
        )

    # 3. calcular tiempo
    exit_time = datetime.now(timezone.utc)
    entry_time = session["entry_time"]

    duration_seconds = (exit_time - entry_time).total_seconds()
    duration_minutes = int(duration_seconds / 60)

    # 4. calcular precio
    hourly_rate = session["hourly_rate"]
    hours = duration_minutes / 60
    total_amount = round(hours * hourly_rate, 2)

    # 5. actualizar sesión
    session["exit_time"] = exit_time
    session["duration_minutes"] = duration_minutes
    session["total_amount"] = total_amount
    session["status"] = "PENDING_PAYMENT"
    session["payment_status"] = "PENDING"

    return {
        "session_token": token,
        "status": session["status"],
        "payment_status": session["payment_status"],
        "entry_time": session["entry_time"],
        "exit_time": session["exit_time"],
        "duration_minutes": session["duration_minutes"],
        "hourly_rate": session["hourly_rate"],
        "total_amount": session["total_amount"],
        "message": "Checkout calculado correctamente",
    }