from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.risk import RiskAssessment
from app.core.risk import risk_level, risk_color
def list_risks(db: Session, level=None, commodity_id=None, location_id=None):
    stmt=select(RiskAssessment)
    if level: stmt=stmt.where(RiskAssessment.level==level.upper())
    if commodity_id is not None: stmt=stmt.where(RiskAssessment.commodity_id==commodity_id)
    if location_id is not None: stmt=stmt.where(RiskAssessment.location_id==location_id)
    return db.scalars(stmt.order_by(RiskAssessment.timestamp.desc())).all()
def get_risk(db, risk_id): return db.get(RiskAssessment, risk_id)
