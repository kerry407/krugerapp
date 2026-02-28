# import requests
# from app.config import TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID


# def send_telegram_message(text: str):
#     url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"

#     payload = {
#         "chat_id": TELEGRAM_CHAT_ID,
#         "text": text,
#         "parse_mode": "HTML",
#     }

#     try:
#         requests.post(
#             url,
#             json=payload,
#             timeout=3
#         )
#     except Exception:
#         pass

#     print("📨 Telegram task triggered")
#     print(text)

import requests
from app.config import TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID


def send_telegram_message(text: str) -> None:

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"

    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": text,
        "parse_mode": "HTML",
    }

    try:
        response = requests.post(url, json=payload, timeout=5)
        print("Telegram status:", response.status_code)
        print("Telegram response:", response.text)
        
    except Exception as e:
        print("Telegram exception:", e)
