from app.core.risk import risk_level
def test_risk_thresholds():
    assert risk_level(25)=="STABLE"; assert risk_level(26)=="WATCH"
    assert risk_level(50)=="WATCH"; assert risk_level(51)=="MODERATE"
    assert risk_level(75)=="MODERATE"; assert risk_level(76)=="CRITICAL"
def test_risks(client):
    assert client.get("/api/risk").status_code==200
