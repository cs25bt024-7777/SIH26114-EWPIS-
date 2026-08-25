from datetime import datetime
from .common import ORMBase
class ForecastOut(ORMBase):
    id: int
    commodity_id: int
    location_id: int | None
    forecast_date: datetime
    predicted_price: float
    lower_bound: float | None
    upper_bound: float | None
    confidence: float | None
    trend: str
