from .common import ORMBase
class LocationOut(ORMBase):
    id: int
    name: str
    state: str
    region: str
    latitude: float | None = None
    longitude: float | None = None
