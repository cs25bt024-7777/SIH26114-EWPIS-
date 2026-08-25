from datetime import datetime
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.price_service import list_prices
from app.schemas.price import PriceOut
router=APIRouter()
@router.get("/api/prices", response_model=list[PriceOut])
def prices(commodity_id:int|None=None, location_id:int|None=None,
           date_from:datetime|None=Query(None), date_to:datetime|None=Query(None),
           db:Session=Depends(get_db)):
    return list_prices(db,commodity_id,location_id,date_from,date_to)
