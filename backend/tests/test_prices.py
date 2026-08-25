def test_prices(client):
    r=client.get("/api/prices"); assert r.status_code==200
def test_price_filter(client):
    assert client.get("/api/prices?commodity_id=1").status_code==200
