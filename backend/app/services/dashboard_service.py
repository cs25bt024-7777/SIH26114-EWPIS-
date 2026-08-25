from sqlalchemy import select, func
from sqlalchemy.orm import Session
from app.models.commodity import Commodity
from app.models.location import Location
from app.models.alert import Alert
from app.models.risk import RiskAssessment
from app.models.forecast import Forecast
def overview(db: Session):
    commodities=db.scalars(select(Commodity).where(Commodity.is_active.is_(True)).order_by(Commodity.name)).all()
    locations=db.scalars(select(Location).order_by(Location.name)).all()
    alerts=db.scalars(select(Alert).order_by(Alert.timestamp.desc()).limit(10)).all()
    risks=db.scalars(select(RiskAssessment).order_by(RiskAssessment.timestamp.desc()).limit(20)).all()
    forecasts=db.scalars(select(Forecast).order_by(Forecast.forecast_date).limit(30)).all()
    summary={level: db.scalar(select(func.count()).select_from(RiskAssessment).where(RiskAssessment.level==level)) or 0
             for level in ("STABLE","WATCH","MODERATE","CRITICAL")}
    return {"commodities":commodities,"locations":locations,"alerts":alerts,"risks":risks,"forecasts":forecasts,"risk_summary":summary}
