from datetime import datetime
from .common import ORMBase
class RiskOut(ORMBase):
    id: int
    commodity_id: int
    location_id: int
    score: float
    level: str
    color: str
    factors: list
    timestamp: datetime
