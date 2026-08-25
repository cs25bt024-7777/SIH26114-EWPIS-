from datetime import datetime
from .common import ORMBase
class CommodityOut(ORMBase):
    id: int
    name: str
    unit: str
    category: str
    is_active: bool
    created_at: datetime | None = None
