def test_dashboard(client):
    r=client.get("/api/dashboard"); assert r.status_code==200
    data=r.json(); assert "risk_summary" in data and "commodities" in data
