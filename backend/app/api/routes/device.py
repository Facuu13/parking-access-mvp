from fastapi import APIRouter, HTTPException
from app.core.storage import commands, sessions

router = APIRouter()


@router.get("/devices/{device_id}/commands")
def get_commands(device_id: str):
    pending_commands = [
        cmd for cmd in commands
        if cmd["device_id"] == device_id and cmd["status"] == "PENDING"
    ]

    return {
        "device_id": device_id,
        "commands": pending_commands
    }

@router.post("/devices/{device_id}/commands/{command_id}/execute")
def execute_command(device_id: str, command_id: int):
    command = next((c for c in commands if c["command_id"] == command_id), None)

    if not command:
        raise HTTPException(status_code=404, detail="Comando no encontrado")

    if command["status"] != "PENDING":
        raise HTTPException(status_code=400, detail="Comando ya ejecutado")

    # marcar como ejecutado
    command["status"] = "EXECUTED"

    token = command["session_token"]
    session = sessions.get(token)

    if session:
        session["opened_on_exit"] = True
        session["status"] = "COMPLETED"

    return {
        "message": "Comando ejecutado correctamente"
    }