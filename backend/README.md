# EWPIS Backend

FastAPI + SQLAlchemy backend for the SIH26114-EWPIS frontend.

## Setup

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Copy `.env.example` to `.env` and set `DATABASE_URL`. For local development the default can be SQLite; production should use Supabase PostgreSQL.

## Seed demo data

```powershell
python -m app.seed.seed_data
```

## Run

```powershell
uvicorn app.main:app --reload
```

API: `http://localhost:8000/api`
Docs: `http://localhost:8000/docs`

## Test

```powershell
pytest
```

## Production database

Set `DATABASE_URL` to a Supabase PostgreSQL connection string. Use Alembic for production migrations.
