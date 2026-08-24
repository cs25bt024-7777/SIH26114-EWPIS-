# SIH26114 — Machine Learning Specification

## 1. Objective

The ML system should forecast essential commodity prices and identify abnormal conditions that may indicate future price or shortage risk.

The ML system supports the government's early-warning decision-support workflow.

---

# 2. Main ML Tasks

The system contains four major analytical tasks:

1. Data preprocessing
2. Price forecasting
3. Anomaly detection
4. Risk scoring

---

# 3. Data

Potential inputs include:

- Historical commodity prices
- Mandi arrivals
- Weather information
- Logistics/supply indicators
- Seasonal patterns

The exact features depend on the availability and quality of real data.

---

# 4. Data Preprocessing

The preprocessing pipeline should handle:

- Missing values
- Duplicate records
- Invalid values
- Date normalization
- Outliers
- Unit normalization
- Location normalization
- Commodity normalization

All preprocessing should be reproducible.

---

# 5. Feature Engineering

Potential features:

### Price features

- Current price
- Previous-day price
- Weekly average
- Rolling average
- Price change percentage
- Historical volatility

### Supply features

- Mandi arrival quantity
- Arrival change percentage
- Rolling arrival average

### Weather features

- Rainfall
- Temperature
- Rainfall anomaly
- Weather deviation from normal conditions

### Seasonal features

- Month
- Week
- Seasonal trend

---

# 6. Forecasting

The project proposes:

- Prophet
- LightGBM

Prophet can capture trend and seasonal behavior.

LightGBM can incorporate multiple explanatory features.

The team may compare models and select the approach that performs best on validation data.

---

# 7. Forecast Horizon

The system should support short-term forecasting.

Target:

7–30 days.

The exact horizon can depend on the commodity and data availability.

---

# 8. Forecast Output

Each prediction should contain:

- Commodity
- Location
- Forecast date
- Predicted price
- Lower bound
- Upper bound
- Model name
- Model version

---

# 9. Anomaly Detection

The system should detect abnormal movements using statistical methods such as Z-score.

A basic anomaly score can be derived from deviation from expected historical behavior.

The team should evaluate whether the detected anomaly represents a meaningful abnormal event rather than normal seasonal variation.

---

# 10. Risk Score

The risk engine combines multiple signals.

Potential signals:

- Price increase
- Forecast increase
- Price anomaly
- Declining mandi arrivals
- Weather anomaly
- Logistics/supply signals
- Historical/seasonal context

The final risk score should be normalized to a clear range.

Target:

0–100.

---

# 11. Risk Levels

### LOW

Normal/stable condition.

### YELLOW

Early warning.

### ORANGE

Moderate/high developing risk.

### RED

Severe/critical risk.

Thresholds should be documented and validated during model development.

---

# 12. Shortage Probability

The system should estimate shortage probability where sufficient data exists.

Output:

0–1 probability.

Example:

0.87 = 87% estimated probability.

This value should be clearly labeled as a model estimate rather than a guaranteed outcome.

---

# 13. Model Evaluation

Forecasting models should be evaluated using appropriate metrics.

Possible metrics:

- MAE
- RMSE
- MAPE

For classification/probability outputs, appropriate metrics may include:

- Precision
- Recall
- F1-score
- ROC-AUC
- Calibration

The final evaluation approach should depend on the actual dataset.

---

# 14. Model Versioning

Every generated forecast/risk output should record the model version.

Example:

model_version:

`forecast-v1.0`

This allows future comparison and debugging.

---

# 15. ML Output

The ML system should produce structured JSON-compatible output.

Example:

{
  "commodity": "Onion",
  "location": "Karnataka",
  "current_price": 42,
  "predicted_price": 58,
  "shortage_probability": 0.87,
  "risk_score": 87,
  "risk_level": "RED",
  "risk_factors": []
}

---

# 16. ML Principles

- Do not fabricate model accuracy.
- Do not claim real-world prediction capability without validation.
- Separate training data from evaluation data.
- Avoid data leakage.
- Preserve reproducibility.
- Record model versions.
- Explain important risk factors where possible.

---

# 17. ML Integration

The ML system should not directly control the frontend.

Preferred architecture:

ML
 ↓
Structured Output
 ↓
FastAPI
 ↓
Next.js

The frontend should only consume the API contract.