from sqlalchemy import String, Boolean, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class Commodity(Base):
    __tablename__ = "commodities"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    unit: Mapped[str] = mapped_column(String(30), default="quintal")
    category: Mapped[str] = mapped_column(String(50), default="vegetable")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now())
    prices = relationship("CommodityPrice", back_populates="commodity", cascade="all, delete-orphan")
    forecasts = relationship("Forecast", back_populates="commodity", cascade="all, delete-orphan")
    risks = relationship("RiskAssessment", back_populates="commodity", cascade="all, delete-orphan")
