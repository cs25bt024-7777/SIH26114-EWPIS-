import os
os.environ["DATABASE_URL"]="sqlite:///./test.db"
from fastapi.testclient import TestClient
from app.main import app
from app.db.base import Base
from app.db.session import engine
import app.models
import pytest
@pytest.fixture(scope="session", autouse=True)
def setup():
    Base.metadata.drop_all(bind=engine); Base.metadata.create_all(bind=engine)
    from app.seed.seed_data import seed
    seed()
    yield
    Base.metadata.drop_all(bind=engine)
@pytest.fixture
def client(): return TestClient(app)
