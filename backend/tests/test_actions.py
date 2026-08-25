def test_actions(client):
    assert client.get("/api/actions").status_code==200
