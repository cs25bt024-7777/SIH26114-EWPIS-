from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.commodity import Commodity
def list_commodities(db: Session, search: str | None = None):
    stmt = select(Commodity).where(Commodity.is_active.is_(True))
    if search:
        stmt = stmt.where(Commodity.name.ilike(f"%{search}%"))
    return db.scalars(stmt.order_by(Commodity.name)).all()
def get_commodity(db, commodity_id):
    return db.get(Commodity, commodity_id)
