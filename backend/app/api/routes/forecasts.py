from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.forecast_service import list_forecasts
from app.schemas.forecast import ForecastOut
router=APIRouter()
@router.get("/api/forecasts", response_model=list[ForecastOut])
def forecasts(commodity_id:int|None=None, location_id:int|None=None, db:Session=Depends(get_db)):
    return list_forecasts(db,commodity_id,location_id)
