# SIH26114 — API Contract

## 1. Purpose

This document defines the communication contract between:

- Next.js frontend
- FastAPI backend
- ML system
- Database

The API contract should remain stable once frontend integration begins.

---

# 2. Base URL

Development:

http://localhost:8000

Production URL will be configured after deployment.

All API endpoints use the `/api` prefix.

---

# 3. Response Format

Successful responses should use JSON.

Example:

{
  "success": true,
  "data": {}
}

Errors should use:

{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}

---

# 4. Dashboard API

## GET /api/dashboard

Returns the main dashboard summary.

Example response:

{
  "success": true,
  "data": {
    "total_commodities": 12,
    "critical_alerts": 7,
    "moderate_alerts": 14,
    "early_warnings": 28,
    "stable_regions": 35
  }
}

---

# 5. Commodity APIs

## GET /api/commodities

Returns the list of monitored commodities.

## GET /api/commodities/{commodity_id}

Returns details of a commodity.

Optional query parameters:

- location_id
- start_date
- end_date

---

# 6. Location APIs

## GET /api/locations

Returns available states and districts.

Optional parameters:

- type
- parent_location_id

## GET /api/locations/{location_id}

Returns details for a location.

---

# 7. Price API

## GET /api/prices

Query parameters:

- commodity_id
- location_id
- start_date
- end_date

Returns historical price observations.

---

# 8. Forecast API

## GET /api/forecasts

Query parameters:

- commodity_id
- location_id
- start_date
- end_date

Returns historical forecast results.

Example:

{
  "success": true,
  "data": {
    "commodity_id": "uuid",
    "location_id": "uuid",
    "model": "Prophet",
    "forecast": [
      {
        "date": "2026-09-01",
        "predicted_price": 58,
        "lower_bound": 52,
        "upper_bound": 64
      }
    ]
  }
}

---

# 9. Risk API

## GET /api/risk

Query parameters:

- commodity_id
- location_id

Returns the current risk assessment.

Example:

{
  "success": true,
  "data": {
    "risk_score": 87,
    "shortage_probability": 0.87,
    "risk_level": "RED",
    "price_change_percentage": 18.4,
    "anomaly_score": 3.2
  }
}

---

# 10. Alert APIs

## GET /api/alerts

Query parameters:

- status
- alert_level
- commodity_id
- location_id

Returns alerts.

## GET /api/alerts/{alert_id}

Returns complete alert details.

## PATCH /api/alerts/{alert_id}

Updates alert status.

Allowed statuses:

- NEW
- UNDER_REVIEW
- ACTION_TAKEN
- CLOSED

---

# 11. Recommendation API

## GET /api/alerts/{alert_id}/recommendations

Returns decision-support recommendations associated with an alert.

---

# 12. ML Output Contract

The ML system should provide structured output.

Example:

{
  "commodity": "Onion",
  "location": "Karnataka",
  "current_price": 42,
  "predicted_price": 58,
  "shortage_probability": 0.87,
  "risk_score": 87,
  "risk_level": "RED",
  "risk_factors": [
    {
      "factor": "Mandi arrivals",
      "impact": "HIGH",
      "description": "Arrivals decreased significantly."
    },
    {
      "factor": "Price anomaly",
      "impact": "HIGH",
      "description": "Price is above expected seasonal range."
    }
  ]
}

---

# 13. Gemini Input Contract

Gemini receives structured risk information.

Example:

{
  "commodity": "Onion",
  "location": "Karnataka",
  "risk_level": "RED",
  "risk_score": 87,
  "shortage_probability": 0.87,
  "risk_factors": []
}

Gemini should return structured explanation/recommendation data.

---

# 14. Authentication

Protected APIs require an authenticated Supabase user.

The backend should validate the user's authentication information before returning protected data.

---

# 15. API Principles

- Use REST-style endpoints.
- Use JSON.
- Use stable field names.
- Do not expose database implementation details unnecessarily.
- Do not return frontend-specific formatting from backend APIs.
- Numerical ML outputs must remain structured.
- Frontend is responsible for visual formatting.