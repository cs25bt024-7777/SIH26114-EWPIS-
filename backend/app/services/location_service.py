from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.location import Location
def list_locations(db: Session):
    return db.scalars(select(Location).order_by(Location.state, Location.name)).all()
def get_location(db, location_id):
    return db.get(Location, location_id)
