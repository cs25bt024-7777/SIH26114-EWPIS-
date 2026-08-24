# SIH26114 — Database Schema

## 1. Database

Database technology:

- Supabase PostgreSQL

The database stores application data, historical observations, ML outputs, alerts and recommendations.

---

# 2. Main Tables

The initial database will contain the following tables:

1. users
2. commodities
3. locations
4. price_history
5. mandi_arrivals
6. weather_data
7. forecasts
8. risk_scores
9. alerts
10. recommendations

The schema should remain simple during the initial prototype and can be extended when real data requirements are confirmed.

---

# 3. users

Stores application users and their roles.

### Fields

- id
- email
- full_name
- role
- state_id
- district_id
- created_at

### Role values

- ADMIN
- STATE_OFFICER
- DISTRICT_OFFICER

Authentication is handled through Supabase Auth.

The application database should store application-specific profile and role information.

---

# 4. commodities

Stores monitored essential commodities.

### Fields

- id
- name
- category
- unit
- is_active
- created_at

### Example

```text
Onion
Potato
Tomato
Rice
Wheat