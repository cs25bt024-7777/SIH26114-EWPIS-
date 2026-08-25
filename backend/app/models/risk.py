from datetime import datetime
from sqlalchemy import ForeignKey, String, Numeric, DateTime, Text, JSON, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class RiskAssessment(Base):
    __tablename__ = "risk_assessments"
    id: Mapped[int] = mapped_column(primary_key=True)
    commodity_id: Mapped[int] = mapped_column(ForeignKey("commodities.id", ondelete="CASCADE"), index=True)
    location_id: Mapped[int] = mapped_column(ForeignKey("locations.id", ondelete="CASCADE"), index=True)
    score: Mapped[float] = mapped_column(Numeric(5, 2))
    level: Mapped[str] = mapped_column(String(20), index=True)
    color: Mapped[str] = mapped_column(String(20))
    factors: Mapped[list] = mapped_column(JSON, default=list)
    timestamp: Mapped[datetime] = mapped_column(DateTime, index=True)
    commodity = relationship("Commodity", back_populates="risks")
    location = relationship("Location", back_populates="risks")
    actions = relationship("RecommendedAction", back_populates="risk", cascade="all, delete-orphan")
    __table_args__ = (Index("ix_risk_location_level", "location_id", "level"),)
