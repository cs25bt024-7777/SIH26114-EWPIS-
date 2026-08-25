from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.commodity_service import list_commodities, get_commodity
from app.schemas.commodity import CommodityOut
router=APIRouter()
@router.get("/api/commodities", response_model=list[CommodityOut])
def commodities(search: str|None=Query(None, max_length=100), db: Session=Depends(get_db)):
    return list_commodities(db, search)
@router.get("/api/commodities/{commodity_id}", response_model=CommodityOut)
def commodity(commodity_id:int, db:Session=Depends(get_db)):
    obj=get_commodity(db,commodity_id)
    if not obj: raise HTTPException(404,"Commodity not found")
    return obj
