from datetime import datetime
from pydantic import BaseModel


class EntryRequest(BaseModel):
    entry_gate_id: str


class EntryResponse(BaseModel):
    session_token: str
    status: str
    payment_status: str
    entry_time: datetime
    message: str


class CheckoutRequest(BaseModel):
    exit_gate_id: str