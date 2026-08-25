def test_locations(client):
    r=client.get("/api/locations"); assert r.status_code==200; assert len(r.json())>=6
