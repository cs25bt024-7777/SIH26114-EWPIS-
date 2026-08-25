def risk_level(score: float) -> str:
    score = max(0, min(100, score))
    if score <= 25:
        return "STABLE"
    if score <= 50:
        return "WATCH"
    if score <= 75:
        return "MODERATE"
    return "CRITICAL"

def risk_color(level: str) -> str:
    return {
        "STABLE": "GREEN",
        "WATCH": "YELLOW",
        "MODERATE": "ORANGE",
        "CRITICAL": "RED",
    }.get(level, "YELLOW")
