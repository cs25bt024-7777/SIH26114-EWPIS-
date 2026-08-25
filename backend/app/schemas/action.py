from datetime import datetime
from .common import ORMBase
class ActionOut(ORMBase):
    id: int
    risk_id: int | None
    alert_id: int | None
    priority: str
    status: str
    summary: str
    actions: list
    rationale: str
    disclaimer: str
    created_at: datetime
