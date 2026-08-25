def test_alerts(client):
    r=client.get("/api/alerts"); assert r.status_code==200
def test_alert_filter(client):
    r=client.get("/api/alerts?severity=critical"); assert r.status_code==200
