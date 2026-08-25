from datetime import datetime
from sqlalchemy import ForeignKey, Numeric, DateTime, String, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class Forecast(Base):
    __tablename__ = "forecasts"
    id: Mapped[int] = mapped_column(primary_key=True)
    commodity_id: Mapped[int] = mapped_column(ForeignKey("commodities.id", ondelete="CASCADE"), index=True)
    location_id: Mapped[int | None] = mapped_column(ForeignKey("locations.id", ondelete="SET NULL"), index=True)
    forecast_date: Mapped[datetime] = mapped_column(DateTime, index=True)
    predicted_price: Mapped[float] = mapped_column(Numeric(12, 2))
    lower_bound: Mapped[float | None] = mapped_column(Numeric(12, 2))
    upper_bound: Mapped[float | None] = mapped_column(Numeric(12, 2))
    confidence: Mapped[float | None] = mapped_column(Numeric(5, 2))
    trend: Mapped[str] = mapped_column(String(30), default="STABLE")
    commodity = relationship("Commodity", back_populates="forecasts")
    location = relationship("Location")
    __table_args__ = (Index("ix_forecast_commodity_date", "commodity_id", "forecast_date"),)
