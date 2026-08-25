from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.action import RecommendedAction
def list_actions(db, alert_id=None, risk_id=None):
    stmt=select(RecommendedAction)
    if alert_id is not None: stmt=stmt.where(RecommendedAction.alert_id==alert_id)
    if risk_id is not None: stmt=stmt.where(RecommendedAction.risk_id==risk_id)
    return db.scalars(stmt.order_by(RecommendedAction.created_at.desc())).all()
