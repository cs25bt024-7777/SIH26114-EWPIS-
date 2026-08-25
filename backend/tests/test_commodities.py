def test_commodities(client):
    r=client.get("/api/commodities"); assert r.status_code==200; assert len(r.json())>=8
def test_commodity_not_found(client):
    assert client.get("/api/commodities/99999").status_code==404
