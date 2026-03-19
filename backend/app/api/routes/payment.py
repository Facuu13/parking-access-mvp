from fastapi import APIRouter, HTTPException
from app.core.storage import sessions, commands

router = APIRouter()


@router.post("/sessions/{token}/pay")
def pay_session(token: str):
    session = sessions.get(token)

    # 1. validar existencia
    if not session:
        raise HTTPException(status_code=404, detail="Sesión no encontrada")

    # 2. validar estado correcto
    if session["status"] != "PENDING_PAYMENT":
        raise HTTPException(
            status_code=400,
            detail="La sesión no está lista para pago",
        )

    # 3. simular pago
    session["payment_status"] = "APPROVED"
    session["status"] = "PAID"

    command = {
    "command_id": len(commands) + 1,
    "device_id": "gate-exit-001",
    "command_type": "OPEN_EXIT_GATE",
    "session_token": token,
    "status": "PENDING",
    }
    commands.append(command)


    return {
        "session_token": token,
        "status": session["status"],
        "payment_status": session["payment_status"],
        "total_amount": session["total_amount"],
        "message": "Pago aprobado correctamente",
    }