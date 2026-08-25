from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.alert import Alert
def list_alerts(db, severity=None, commodity_id=None, location_id=None, status=None):
    stmt=select(Alert)
    if severity: stmt=stmt.where(Alert.severity==severity.upper())
    if commodity_id is not None: stmt=stmt.where(Alert.commodity_id==commodity_id)
    if location_id is not None: stmt=stmt.where(Alert.location_id==location_id)
    if status: stmt=stmt.where(Alert.status==status.upper())
    return db.scalars(stmt.order_by(Alert.timestamp.desc())).all()
def get_alert(db, alert_id): return db.get(Alert, alert_id)
