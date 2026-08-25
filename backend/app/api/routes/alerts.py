from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.alert_service import list_alerts, get_alert
from app.services.action_service import list_actions
from app.schemas.alert import AlertOut, AlertStatusUpdate
from app.schemas.action import ActionOut
router=APIRouter()
VALID_STATUS={"NEW","UNDER_REVIEW","ACTION_TAKEN","CLOSED"}
@router.get("/api/alerts", response_model=list[AlertOut])
def alerts(severity:str|None=None, commodity_id:int|None=None, location_id:int|None=None, status:str|None=None, db:Session=Depends(get_db)):
    return list_alerts(db,severity,commodity_id,location_id,status)
@router.get("/api/alerts/{alert_id}", response_model=AlertOut)
def alert(alert_id:int, db:Session=Depends(get_db)):
    obj=get_alert(db,alert_id)
    if not obj: raise HTTPException(404,"Alert not found")
    return obj
@router.patch("/api/alerts/{alert_id}", response_model=AlertOut)
def update_alert(alert_id:int, payload:AlertStatusUpdate, db:Session=Depends(get_db)):
    if payload.status.upper() not in VALID_STATUS: raise HTTPException(422,"Invalid alert status")
    obj=get_alert(db,alert_id)
    if not obj: raise HTTPException(404,"Alert not found")
    obj.status=payload.status.upper()
    db.commit(); db.refresh(obj)
    return obj
@router.get("/api/alerts/{alert_id}/recommendations", response_model=list[ActionOut])
def recommendations(alert_id:int, db:Session=Depends(get_db)):
    if not get_alert(db,alert_id): raise HTTPException(404,"Alert not found")
    return list_actions(db,alert_id=alert_id)
