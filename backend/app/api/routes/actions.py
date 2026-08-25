from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.action_service import list_actions
from app.schemas.action import ActionOut
router=APIRouter()
@router.get("/api/actions", response_model=list[ActionOut])
def actions(alert_id:int|None=None, risk_id:int|None=None, db:Session=Depends(get_db)):
    return list_actions(db,alert_id,risk_id)
