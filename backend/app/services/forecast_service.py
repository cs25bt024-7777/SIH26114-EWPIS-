from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.forecast import Forecast
def list_forecasts(db: Session, commodity_id=None, location_id=None):
    stmt=select(Forecast)
    if commodity_id is not None: stmt=stmt.where(Forecast.commodity_id==commodity_id)
    if location_id is not None: stmt=stmt.where(Forecast.location_id==location_id)
    return db.scalars(stmt.order_by(Forecast.forecast_date)).all()
