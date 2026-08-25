def test_forecasts(client):
    assert client.get("/api/forecasts").status_code==200
