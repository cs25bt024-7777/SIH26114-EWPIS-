# SIH26114 — AI/Developer Handoff

## 1. Purpose

This document helps developers and AI coding assistants continue work without losing project context.

The documentation folder is the project's source of truth.

---

# 2. Project

SIH26114 — Essential Commodity Price & Shortage Early Warning System (EWPIS).

Goal:

Provide early detection of commodity price/shortage risks and support government decision-making.

---

# 3. Current Architecture

Frontend:

Next.js + TypeScript + Tailwind + shadcn/ui + Recharts

The working Next.js application currently lives at:

`SIH26114-EWPIS-/frontend`

(the nested folder that already contained the App Router structure, shadcn primitives, and `node_modules`). The parent `frontend/` directory at the repository root was empty and was not duplicated.

Backend:

FastAPI — **not connected in this phase**

Database:

Supabase PostgreSQL — **not connected**

Authentication:

Supabase Auth — **not implemented**

ML:

Python + Prophet + LightGBM + statistical anomaly detection — **not connected**

AI:

Gemini — **not connected**

---

# 4. Development Rules

Before making changes, read:

- PROJECT_CONTEXT.md
- ARCHITECTURE.md
- relevant specification file

Do not change architecture, database schema or API contracts without approval.

---

# 5. Current Development Stage

Current stage:

**Frontend prototype with local mock data**

Completed:

- GitHub repository / documentation structure (prior work)
- Next.js frontend initialized (prior work)
- Tailwind + shadcn/ui primitives (prior work)
- Complete application shell (sidebar, header, responsive sheet nav)
- Dashboard, commodities, alerts, locations, actions, settings pages
- Consistent GREEN/YELLOW/ORANGE/RED risk model
- Mock datasets and `lib/api.ts` abstraction
- Historical price and forecast charts
- Schematic regional risk board
- `npm run lint` clean
- `npm run build` successful

---

# 6. Current Frontend Status

- [x] Next.js initialized
- [x] Tailwind configured
- [x] shadcn/ui configured
- [x] Application layout
- [ ] Login (intentionally deferred; UI_SPEC lists it, this phase did not add auth)
- [x] Dashboard
- [x] Risk map (schematic board, not Leaflet/geo boundaries)
- [x] Commodity details (register + cards + risk factors)
- [x] Alerts
- [x] Action Center
- [x] Mock data
- [ ] API integration (FastAPI)

---

# 7. Current Backend Status

- [ ] FastAPI initialized (out of scope for this pass)
- [ ] API structure
- [ ] Database connection
- [ ] Dashboard endpoint
- [ ] Commodity endpoints
- [ ] Location endpoints
- [ ] Forecast endpoints
- [ ] Risk endpoints
- [ ] Alert endpoints
- [ ] Recommendation endpoints

---

# 8. Current ML Status

- [ ] Dataset collected
- [ ] Data cleaning
- [ ] Feature engineering
- [ ] Baseline forecast
- [ ] Prophet
- [ ] LightGBM
- [ ] Anomaly detection
- [ ] Risk engine
- [ ] Evaluation
- [ ] API integration

---

# 9. What was implemented (this pass)

A government-oriented EWPIS frontend that reads only local mock data through `lib/api.ts`.

Major product surfaces:

- Root `/` redirects to `/dashboard`
- Dashboard: risk overview (Stable / Watch / Moderate / Critical), schematic India risk board, critical alerts, historical prices, forecast, priority commodity cards, contributing factors
- Commodities: search/filters, table + cards, risk factors
- Alerts: filters (risk, commodity, location, status), labelled severity, empty states
- Locations: regional board + state/district cards
- Actions: decision-support recommendations with explicit “not an order” disclaimer
- Settings: local/session UI only (profile, notifications, system info)

Risk model (centralized in `lib/risk.ts`):

- 0–25 GREEN / Stable
- 26–50 YELLOW / Watch
- 51–75 ORANGE / Moderate
- 76–100 RED / Critical

---

# 10. Files created

New application source (empty stubs were filled; `types/forecast.ts` replaced empty `types/forecast.cs`):

- `frontend/lib/risk.ts`
- `frontend/lib/api.ts`
- `frontend/lib/mock-data.ts`
- `frontend/types/*.ts` (risk, commodity, alert, forecast)
- `frontend/components/risk-badge.tsx`
- `frontend/components/page-intro.tsx`
- `frontend/app/*/loading.tsx`
- `frontend/app/commodities/commodities-client.tsx`
- `frontend/app/alerts/alerts-client.tsx`
- `frontend/app/locations/locations-client.tsx`
- `frontend/app/actions/actions-client.tsx`
- `frontend/app/settings/settings-client.tsx`

Existing layout/page/component files under `frontend/` were implemented rather than replaced with a new Next.js project.

---

# 11. Files modified

- `frontend/app/layout.tsx`, `frontend/app/page.tsx`, `frontend/app/globals.css`
- `frontend/app/dashboard/page.tsx` and other route `page.tsx` files
- `frontend/components/layout/*`
- `frontend/components/dashboard/*`
- `frontend/components/commodities/*`
- `frontend/components/alerts/*`
- `frontend/components/actions/*`
- `frontend/lib/utils.ts`
- `frontend/next.config.ts` (`turbopack.root` so the app is not confused with a home-directory lockfile)
- `docs/HANDOFF.md` (this file)

shadcn/ui primitives under `components/ui/` were reused, not rewritten.

---

# 12. Current frontend architecture

```
app/page.tsx                → redirect /dashboard
app/*/page.tsx              → route composition
components/layout           → shell, sidebar, header
components/dashboard        → summary, map, alerts, charts
components/{commodities,alerts,actions}
components/ui               → shadcn primitives
lib/api.ts                  → only data boundary used by UI
lib/mock-data.ts            → demonstration datasets
lib/risk.ts                 → score → level/color/labels
types/                      → shared TypeScript contracts
```

Pages stay thin. Interactive filters live in `*-client.tsx` files. Charts are client components (Recharts).

---

# 13. Current mock-data architecture

`lib/mock-data.ts` is the single demonstration source:

- commodities (onion, tomato, potato, rice, wheat, tur, sugar, mustard oil)
- Indian markets/states/districts with lat/lng for a future map layer
- risk assessments derived from scores
- alerts and recommended actions
- deterministic historical + forecast series

`lib/api.ts` wraps those structures in `{ success, data, source: "mock" }` results. Components must not import mock arrays directly (except via `api`).

Replace function bodies in `api.ts` later with `fetch` to FastAPI `/api/...` from `API_CONTRACT.md`.

---

# 14. Current limitations

- Mock / synthetic numbers only; labelled as demonstration data
- Risk map is a schematic state board, not official GIS boundaries
- Leaflet is installed but unused in this phase
- Charts use mock series labelled as ensemble demonstration, not live Prophet/LightGBM
- Header search navigates to commodities; it does not query a backend
- Settings state is in-memory in the browser
- Parent repository `frontend/` folder remains empty; the runnable app is nested

---

# 15. Intentionally NOT implemented

- FastAPI, Supabase, Gemini, Python ML
- Login / Supabase Auth
- Real government datasets (DoCA, Agmarknet, IMD)
- Persistence of alert status changes
- Automatic government orders or workflow execution
- Production deployment configuration

---

# 16. Recommended next phase

1. Confirm a single canonical `frontend/` location (move nested app to repo root `frontend/` if that is the intended layout).
2. Stand up FastAPI stubs matching `API_CONTRACT.md` and swap `lib/api.ts` implementations.
3. Add login per UI_SPEC (Supabase Auth) without changing the dashboard information architecture.
4. Connect Leaflet/geojson when boundary data is available; keep the current `Location` lat/lng fields.
5. Replace mock forecasts with ML outputs (Prophet/LightGBM) and keep Gemini for explanation text only.

---

# 17. Lint / build (this pass)

- `npm run lint` — passed
- `npm run build` — passed
- Static routes generated: `/`, `/dashboard`, `/commodities`, `/alerts`, `/locations`, `/actions`, `/settings`

---

# 18. Git reminder

Use feature branches (`frontend-development`). Do not treat experimental work as production. Do not claim backend/ML completeness.
