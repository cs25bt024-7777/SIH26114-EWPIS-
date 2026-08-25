from datetime import datetime
from pydantic import BaseModel
from .common import ORMBase
class AlertOut(ORMBase):
    id: int
    location_id: int
    commodity_id: int | None
    severity: str
    status: str
    title: str
    message: str
    timestamp: datetime
class AlertStatusUpdate(BaseModel):
    status: str
