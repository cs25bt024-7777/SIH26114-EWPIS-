from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.risk_service import list_risks, get_risk
from app.schemas.risk import RiskOut
router=APIRouter()
@router.get("/api/risk", response_model=list[RiskOut])
def risks(level:str|None=None, commodity_id:int|None=None, location_id:int|None=None, db:Session=Depends(get_db)):
    return list_risks(db,level,commodity_id,location_id)
@router.get("/api/risk/{risk_id}", response_model=RiskOut)
def risk(risk_id:int, db:Session=Depends(get_db)):
    obj=get_risk(db,risk_id)
    if not obj: raise HTTPException(404,"Risk assessment not found")
    return obj
