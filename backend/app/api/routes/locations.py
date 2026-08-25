from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.location_service import list_locations, get_location
from app.schemas.location import LocationOut
router=APIRouter()
@router.get("/api/locations", response_model=list[LocationOut])
def locations(db:Session=Depends(get_db)): return list_locations(db)
@router.get("/api/locations/{location_id}", response_model=LocationOut)
def location(location_id:int, db:Session=Depends(get_db)):
    obj=get_location(db,location_id)
    if not obj: raise HTTPException(404,"Location not found")
    return obj
