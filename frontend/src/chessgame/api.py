import requests

def send_move(from_square, to_square):
    url = "http://localhost:3000/api/move"
    payload = {"from": from_square, "to": to_square}
    try:
        response = requests.post(url, json=payload)
        return response.json()
    except requests.exceptions.RequestException as e:
        print("Error connecting to backend:", e)
        return None
