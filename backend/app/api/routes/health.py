from fastapi import APIRouter
from sqlalchemy import text
from app.db.session import SessionLocal
router=APIRouter()
@router.get("/api/health")
def health():
    db=SessionLocal()
    try:
        db.execute(text("SELECT 1"))
        return {"status":"ok","database":"ok"}
    finally:
        db.close()
