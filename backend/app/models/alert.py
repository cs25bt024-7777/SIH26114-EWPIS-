from datetime import datetime
from sqlalchemy import ForeignKey, String, Text, DateTime, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class Alert(Base):
    __tablename__ = "alerts"
    id: Mapped[int] = mapped_column(primary_key=True)
    location_id: Mapped[int] = mapped_column(ForeignKey("locations.id", ondelete="CASCADE"), index=True)
    commodity_id: Mapped[int | None] = mapped_column(ForeignKey("commodities.id", ondelete="SET NULL"), index=True)
    severity: Mapped[str] = mapped_column(String(20), index=True)
    status: Mapped[str] = mapped_column(String(30), default="NEW", index=True)
    title: Mapped[str] = mapped_column(String(200))
    message: Mapped[str] = mapped_column(Text)
    timestamp: Mapped[datetime] = mapped_column(DateTime, index=True)
    location = relationship("Location", back_populates="alerts")
    commodity = relationship("Commodity")
    actions = relationship("RecommendedAction", back_populates="alert", cascade="all, delete-orphan")
    __table_args__ = (Index("ix_alert_location_severity", "location_id", "severity"),)
