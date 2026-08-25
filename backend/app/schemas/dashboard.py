from pydantic import BaseModel
class DashboardOut(BaseModel):
    commodities: list
    alerts: list
    risks: list
    forecasts: list
    locations: list
    risk_summary: dict
