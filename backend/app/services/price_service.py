from sqlalchemy import select, and_
from sqlalchemy.orm import Session
from app.models.price import CommodityPrice
def list_prices(db: Session, commodity_id=None, location_id=None, date_from=None, date_to=None):
    conditions=[]
    if commodity_id is not None: conditions.append(CommodityPrice.commodity_id == commodity_id)
    if location_id is not None: conditions.append(CommodityPrice.location_id == location_id)
    if date_from is not None: conditions.append(CommodityPrice.date >= date_from)
    if date_to is not None: conditions.append(CommodityPrice.date <= date_to)
    stmt=select(CommodityPrice)
    if conditions: stmt=stmt.where(and_(*conditions))
    return db.scalars(stmt.order_by(CommodityPrice.date)).all()
