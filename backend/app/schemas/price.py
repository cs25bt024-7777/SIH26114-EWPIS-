from datetime import datetime
from .common import ORMBase
class PriceOut(ORMBase):
    id: int
    commodity_id: int
    location_id: int | None
    date: datetime
    modal_price: float
    min_price: float | None = None
    max_price: float | None = None
