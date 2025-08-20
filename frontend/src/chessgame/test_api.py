import requests

def test_move():
    url = "http://localhost:3000/api/move"
    payload = {"from": "e2", "to": "e4"}
    try:
        response = requests.post(url, json=payload)
        print("Status Code:", response.status_code)
        print("Response:", response.json())
    except requests.exceptions.RequestException as e:
        print("Error:", e)

if __name__ == "__main__":
    test_move()
