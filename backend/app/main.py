from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.router import router
from app.db.base import Base
from app.db.session import engine
import app.models

app=FastAPI(title=settings.app_name, version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=settings.cors_origin_list,
                   allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(router)

@app.get("/")
def root(): return {"name":settings.app_name,"docs":"/docs"}

@app.on_event("startup")
def startup():
    # Safe local fallback for first-run development. Production schema changes use Alembic.
    if settings.database_url.startswith("sqlite"):
        Base.metadata.create_all(bind=engine)
