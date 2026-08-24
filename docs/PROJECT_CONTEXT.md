# SIH26114 — Essential Commodity Price & Shortage Early Warning System

## 1. Project Overview

SIH26114 is an Essential Commodity Price & Shortage Early Warning System designed to help government authorities identify abnormal commodity price movements and potential shortages at an early stage.

The system combines commodity price information with other relevant signals such as mandi arrivals, weather conditions, logistics/supply-related information and historical patterns.

The objective is to move from reactive monitoring to proactive early warning and decision support.

---

## 2. Core Problem

Essential commodity prices can increase because of factors such as:

- Reduced supply
- Weather conditions
- Seasonal patterns
- Changes in mandi arrivals
- Transportation/logistics problems
- Possible hoarding or supply-chain disruptions

The problem is not only that prices increase.

The important problem is detecting the early signals that indicate that an abnormal price rise or shortage may develop.

The system should therefore help answer:

1. What is happening?
2. Where is it happening?
3. What is likely to happen next?
4. Why is the risk increasing?
5. What action should the government consider?

---

## 3. Proposed Solution

The system will:

1. Collect relevant commodity and supporting data.
2. Clean and preprocess the data.
3. Forecast commodity prices for the near future.
4. Detect abnormal price and supply patterns.
5. Calculate shortage/price risk.
6. Generate Yellow, Orange and Red alerts.
7. Display the situation through a government-oriented dashboard.
8. Explain the major factors contributing to the risk.
9. Provide decision-support recommendations for possible government intervention.

---

## 4. Main Data Inputs

The proposed system considers data sources/categories including:

- Commodity price data
- Mandi arrivals and prices
- Weather information
- Logistics/supply-chain information
- Historical and seasonal commodity patterns

The project proposal identifies government data sources such as the Department of Consumer Affairs, Agmarknet and IMD as relevant sources.

---

## 5. Forecasting

The proposed forecasting approach uses:

- Prophet
- LightGBM

The system should support short-term forecasting in the range of approximately 7–30 days.

---

## 6. Anomaly Detection

The proposed system uses statistical anomaly detection, including Z-score based detection.

The system should distinguish between normal seasonal price variation and abnormal movements.

---

## 7. Alert Levels

### Yellow — Early Warning

Indicates an emerging risk that requires monitoring.

The proposal associates this level with an approximately 15–30 day warning window.

### Orange — Moderate Risk

Indicates a more serious developing risk requiring preparation and possible intervention.

The proposal associates this level with an approximately 7–14 day warning window.

### Red — Severe Risk

Indicates an imminent or severe shortage/price-risk situation.

The proposal associates this level with a warning window of less than approximately 7 days.

---

## 8. Government Decision Support

The system should not stop at predicting a price.

It should help government officials understand:

- The affected commodity
- The affected location
- The expected price movement
- The shortage risk
- The major contributing factors
- Possible intervention options

Possible actions described in the project proposal include monitoring/releasing buffer stocks, procurement, stock-limit enforcement, export-related intervention and movement/rerouting of procurement where appropriate.

The system is a decision-support tool. Final government decisions remain with authorized officials.

---

## 9. Technology Architecture

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- Leaflet / React-Leaflet

### Backend

- Python
- FastAPI

### Database and Authentication

- Supabase
- PostgreSQL
- Supabase Auth

### Machine Learning

- Python
- Pandas
- NumPy
- scikit-learn
- Prophet
- LightGBM

### AI Explanation Layer

- Gemini API

### Deployment

- Frontend: Vercel
- Backend: Render/Railway or equivalent
- Database/Auth: Supabase

---

## 10. Important Architecture Rule

The numerical forecasting and risk calculation should be handled by the ML/statistical system.

Gemini should be used primarily for explanation and recommendation generation rather than replacing the forecasting models.

---

## 11. Project Goal

The final system should provide a clear flow:

Data
→ Preprocessing
→ Forecasting
→ Anomaly/Risk Detection
→ Alert
→ Explanation
→ Recommended Action
→ Government Decision Support

---

## 12. Development Principle

The project will initially be developed using a working prototype with controlled/mock data where necessary.

Real data integrations will be added progressively.

The system should be built incrementally rather than attempting to implement the entire architecture at once.

---

## 13. Source of Truth

The following project documentation files are the source of truth for development:

- PROJECT_CONTEXT.md
- ARCHITECTURE.md
- DATABASE_SCHEMA.md
- API_CONTRACT.md
- UI_SPEC.md
- ML_SPEC.md
- HANDOFF.md

Developers and AI coding assistants should read the relevant documentation before making major changes.

Architecture, database contracts and API contracts should not be changed without team agreement.