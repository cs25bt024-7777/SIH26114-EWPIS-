from fastapi import APIRouter
from .routes import health, dashboard, commodities, locations, prices, forecasts, risk, alerts, actions
router=APIRouter()
router.include_router(health.router, tags=["health"])
router.include_router(dashboard.router, tags=["dashboard"])
router.include_router(commodities.router, tags=["commodities"])
router.include_router(locations.router, tags=["locations"])
router.include_router(prices.router, tags=["prices"])
router.include_router(forecasts.router, tags=["forecasts"])
router.include_router(risk.router, tags=["risk"])
router.include_router(alerts.router, tags=["alerts"])
router.include_router(actions.router, tags=["actions"])
