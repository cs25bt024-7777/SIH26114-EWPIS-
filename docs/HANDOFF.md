# SIH26114 — AI/Developer Handoff

## 1. Purpose

This document helps developers and AI coding assistants continue work without losing project context.

The documentation folder is the project's source of truth.

---

# 2. Project

SIH26114 — Essential Commodity Price & Shortage Early Warning System.

Goal:

Provide early detection of commodity price/shortage risks and support government decision-making.

---

# 3. Current Architecture

Frontend:

Next.js + TypeScript + Tailwind + shadcn/ui

Backend:

FastAPI

Database:

Supabase PostgreSQL

Authentication:

Supabase Auth

ML:

Python + Prophet + LightGBM + statistical anomaly detection

AI:

Gemini

---

# 4. Development Rules

Before making changes, read:

- PROJECT_CONTEXT.md
- ARCHITECTURE.md
- relevant specification file

Do not change architecture, database schema or API contracts without approval.

---

# 5. Current Development Stage

Update this section whenever a major milestone is completed.

Current stage:

Documentation / Project Setup

Completed:

- GitHub repository created
- Documentation structure created
- Project context defined
- Architecture defined
- UI specification defined
- Database schema defined
- API contract defined
- ML specification defined

---

# 6. Current Frontend Status

Update this section during frontend development.

Example:

- [ ] Next.js initialized
- [ ] Tailwind configured
- [ ] shadcn/ui configured
- [ ] Application layout
- [ ] Login
- [ ] Dashboard
- [ ] Risk map
- [ ] Commodity details
- [ ] Alerts
- [ ] Action Center
- [ ] Mock data
- [ ] API integration

---

# 7. Current Backend Status

- [ ] FastAPI initialized
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

# 9. AI Handoff Format

When handing work from one AI assistant to another, provide:

### Current task

Describe what is being implemented.

### Files changed

List files changed by the previous assistant.

### Completed work

Describe what works.

### Remaining work

Describe what still needs to be implemented.

### Problems

List known bugs or decisions that require attention.

### Do not change

List architecture/contracts that must remain unchanged.

---

# 10. Example Handoff

Current task:

Implement the dashboard UI.

Files changed:

- frontend/app/dashboard/page.tsx
- frontend/components/dashboard/StatsCard.tsx

Completed:

- Dashboard layout
- Statistics cards
- Mock alert data

Remaining:

- Risk map
- Commodity chart
- Alert table

Problems:

- Map is not implemented yet.

Do not change:

- API contract
- Database schema
- Architecture

---

# 11. AI Instruction

AI coding assistants should:

1. Read project documentation.
2. Inspect the current repository.
3. Understand existing implementation.
4. Avoid unnecessary rewrites.
5. Preserve existing architecture.
6. Explain major changes before making them when requested.
7. Update HANDOFF.md after completing a major task.

---

# 12. Git Rules

Use feature branches.

Main branch:

`main`

Frontend branch:

`frontend-development`

ML branch:

`ml-development`

Backend branch may be created later.

Do not directly make experimental changes on `main`.

---

# 13. Commit Style

Use clear commit messages.

Examples:

`feat: add dashboard layout`

`feat: add commodity detail page`

`feat: connect dashboard API`

`fix: resolve alert filtering issue`

`docs: update API contract`

`refactor: simplify risk service`

---

# 14. Important Principle

The repository is the source of truth, not an individual AI conversation.

If switching from Claude to Cursor, Codex, Gemini or another assistant, the new assistant should read the repository documentation and current code before continuing.