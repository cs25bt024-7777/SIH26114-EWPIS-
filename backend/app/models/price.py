from datetime import datetime
from sqlalchemy import ForeignKey, Numeric, DateTime, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class CommodityPrice(Base):
    __tablename__ = "commodity_prices"
    id: Mapped[int] = mapped_column(primary_key=True)
    commodity_id: Mapped[int] = mapped_column(ForeignKey("commodities.id", ondelete="CASCADE"), index=True)
    location_id: Mapped[int | None] = mapped_column(ForeignKey("locations.id", ondelete="SET NULL"), index=True)
    date: Mapped[datetime] = mapped_column(DateTime, index=True)
    modal_price: Mapped[float] = mapped_column(Numeric(12, 2))
    min_price: Mapped[float | None] = mapped_column(Numeric(12, 2))
    max_price: Mapped[float | None] = mapped_column(Numeric(12, 2))
    commodity = relationship("Commodity", back_populates="prices")
    location = relationship("Location")
    __table_args__ = (Index("ix_price_commodity_date", "commodity_id", "date"),)
