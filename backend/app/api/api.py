from fastapi import APIRouter

from app.api.routes.health import router as health_router
from app.api.routes.entry import router as entry_router
from app.api.routes.sessions import router as sessions_router
from app.api.routes.checkout import router as checkout_router
from app.api.routes.payment import router as payment_router


api_router = APIRouter()
api_router.include_router(health_router, tags=["health"])
api_router.include_router(entry_router, tags=["entry"])
api_router.include_router(sessions_router, tags=["sessions"])
api_router.include_router(checkout_router, tags=["checkout"])
api_router.include_router(payment_router, tags=["payment"])