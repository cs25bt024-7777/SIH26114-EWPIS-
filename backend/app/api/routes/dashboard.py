from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.dashboard_service import overview
from app.schemas.dashboard import DashboardOut
router=APIRouter()
@router.get("/api/dashboard", response_model=DashboardOut)
def dashboard(db: Session=Depends(get_db)): return overview(db)
