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

# import requests
# import time
# from app.config import TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID


# def send_telegram_message(text: str) -> None:
#     time.sleep(0.2)

#     url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"

#     payload = {
#         "chat_id": TELEGRAM_CHAT_ID,
#         "text": text,
#         "parse_mode": "HTML",
#     }

#     try:
#         response = requests.post(url, json=payload, timeout=5)
#         print("Telegram status:", response.status_code)
#         print("Telegram response:", response.text)
        
#     except Exception as e:
#         print("Telegram exception:", e)

import requests
import threading
from app.config import TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID


def _send(text: str):
    try:
        requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage",
            json={
                "chat_id": TELEGRAM_CHAT_ID,
                "text": text,
                "parse_mode": "HTML",
            },
            timeout=5,
        )
    except Exception as e:
        print("Telegram exception:", e)


def send_telegram_message(text: str):
    thread = threading.Thread(target=_send, args=(text,))
    thread.daemon = True
    thread.start()

