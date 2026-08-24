# SIH26114 UI Specification

## 1. UI Goal

The interface should be designed as a government decision-support dashboard.

The primary goal is:

See the problem
→ Understand the problem
→ Understand the risk
→ Take appropriate action

The interface should prioritize clarity over decorative elements.

---

# 2. Main Screens

## Screen 1 — Login

Purpose:

Allow authorized government users to access the system.

Elements:

- Application name
- Email
- Password
- Login button
- Authentication error message

---

# 3. Main Dashboard

The dashboard should provide an overview of the current commodity situation.

### Main elements

- Total monitored commodities
- Critical alerts
- Moderate alerts
- Early warnings
- Stable regions
- India risk map
- Top critical alerts
- Commodity price trends

---

# 4. India Risk Map

The map should visualize risk geographically.

Risk colors:

- Green — Low
- Yellow — Early Warning
- Orange — Moderate
- Red — Critical

The user should be able to select a region and navigate toward state/district information.

---

# 5. State/District Dashboard

When a user selects a state or district, display:

- Overall risk
- Critical commodities
- Moderate-risk commodities
- Early warnings
- Stable commodities
- Commodity cards
- Relevant price trends
- Relevant alerts

---

# 6. Commodity Details

For a selected commodity and location, display:

### Current Price

Current observed price.

### Forecast Price

Predicted price for the selected forecast period.

### Shortage Probability

Estimated risk from the ML/risk engine.

### Risk Level

- Green
- Yellow
- Orange
- Red

### Historical Price Chart

Display historical price movement.

### Forecast Chart

Display predicted future price movement.

### Supply/Mandi Chart

Display relevant mandi arrival trends where available.

### Weather Information

Display relevant weather conditions/anomalies where available.

---

# 7. Alert Details

The alert details page should answer:

### What is happening?

Display the commodity, location and risk level.

### How serious is it?

Display:

- Risk score
- Shortage probability
- Expected time window

### Why is it happening?

Display major risk factors such as:

- Price anomaly
- Declining mandi arrivals
- Weather anomaly
- Logistics/supply signal

### What should be considered?

Display decision-support recommendations.

---

# 8. Action Center

The Action Center should list alerts requiring attention.

Each action should include:

- Priority
- Commodity
- Location
- Alert level
- Risk
- Reason
- Recommended action
- Status

Possible statuses:

- New
- Under Review
- Action Taken
- Closed

---

# 9. Navigation

Initial navigation:

- Dashboard
- Map
- Commodities
- Alerts
- Action Center

User/profile controls should be available in the application header.

---

# 10. Filters

The application should support filtering by:

- Commodity
- State
- District
- Risk level
- Date/time period

---

# 11. Design Principles

The UI should be:

- Clean
- Professional
- Data-focused
- Responsive
- Accessible
- Easy for government officers to understand

Avoid unnecessary animations and decorative elements.

Risk information must be visually obvious.

---

# 12. Color System

### Green

Low/stable condition.

### Yellow

Early warning.

### Orange

Moderate risk.

### Red

Severe/critical risk.

The colors should always be accompanied by text/icons so that color is not the only indicator.

---

# 13. Mock Data

During initial frontend development, mock data may be used.

The frontend should be designed so that mock data can later be replaced by FastAPI responses without major UI restructuring.

---

# 14. Primary User Flow

Login
→ Dashboard
→ Select region
→ Select commodity
→ View price/forecast
→ View risk
→ View reasons
→ View recommended action
→ Review/act on alert