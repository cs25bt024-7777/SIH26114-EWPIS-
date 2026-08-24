# SIH26114 System Architecture

## 1. High-Level Architecture

The system follows this overall flow:

Government/External Data
        ↓
Data Ingestion
        ↓
Data Cleaning & Preprocessing
        ↓
Feature Engineering
        ↓
ML Forecasting
        ↓
Anomaly Detection & Risk Scoring
        ↓
FastAPI Backend
        ↓
Next.js Dashboard
        ↓
Alerts + Explanation + Decision Support

---

## 2. Main Components

### Frontend

Technology:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- Leaflet / React-Leaflet

Responsibilities:

- Authentication interface
- Dashboard
- India/state/district risk visualization
- Commodity details
- Price and forecast charts
- Alert visualization
- Risk-factor visualization
- Government action recommendations
- Filters and search

---

### Backend

Technology:

- Python
- FastAPI

Responsibilities:

- API endpoints
- Business logic
- Data access
- ML result access
- Alert retrieval
- Recommendation retrieval
- Communication between frontend, database and ML services

---

### Database

Technology:

- Supabase PostgreSQL

Responsibilities:

- Users
- Commodities
- Locations
- Historical prices
- Mandi arrivals
- Weather data
- Forecast results
- Risk scores
- Alerts
- Recommendations

---

### Authentication

Technology:

- Supabase Auth

Initial roles:

- Admin
- State Officer
- District Officer

Role permissions may be expanded later.

---

### Machine Learning

Technology:

- Python
- Prophet
- LightGBM
- scikit-learn
- statistical anomaly detection

Responsibilities:

- Price forecasting
- Feature processing
- Anomaly detection
- Risk scoring
- Shortage-risk estimation

---

### AI Explanation Layer

Technology:

- Gemini API

Responsibilities:

- Explain risk factors in natural language
- Generate structured decision-support explanations
- Generate possible recommended actions from structured ML/risk results

Gemini should not replace the numerical forecasting/risk engine.

---

## 3. Data Flow

### Data Ingestion

Data sources/categories include:

- Commodity prices
- Mandi arrivals
- Weather
- Logistics/supply information

        ↓

### Preprocessing

- Missing-value handling
- Date normalization
- Validation
- Cleaning
- Feature engineering

        ↓

### Forecasting

Prophet and LightGBM are used for near-term price forecasting.

        ↓

### Risk Engine

The system combines relevant signals such as:

- Price movement
- Price anomaly
- Mandi arrivals
- Weather
- Logistics/supply signals
- Seasonal behavior

        ↓

### Alert Engine

The system assigns an alert level.

        ↓

### Backend

FastAPI exposes the required information through APIs.

        ↓

### Frontend

Next.js displays the information to government users.

---

## 4. Frontend-to-Backend Flow

Next.js
   ↓
HTTP API
   ↓
FastAPI
   ↓
Services
   ↓
Database / ML results
   ↓
FastAPI response
   ↓
Next.js UI

---

## 5. ML-to-Backend Flow

ML Pipeline
   ↓
Forecast
   ↓
Anomaly Detection
   ↓
Risk Score
   ↓
Structured ML Output
   ↓
FastAPI
   ↓
Frontend

---

## 6. Gemini Flow

Structured Risk Data
   ↓
Gemini
   ↓
Explanation
   +
Recommended Action
   ↓
FastAPI
   ↓
Frontend

Gemini output should be treated as a supporting decision layer and should not directly modify numerical risk values.

---

## 7. Development Strategy

The project will be developed in stages.

### Stage 1

Frontend with mock data.

### Stage 2

Database and authentication.

### Stage 3

FastAPI backend.

### Stage 4

Frontend-backend integration.

### Stage 5

ML integration.

### Stage 6

Gemini explanation/recommendation.

### Stage 7

Testing and deployment.

---

## 8. Architecture Rule

Do not introduce unnecessary technologies or microservices.

The initial system should remain simple enough for a small development team to maintain and demonstrate during SIH.