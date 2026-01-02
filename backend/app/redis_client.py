import os
import redis
import json
from app.config import REDIS_HOST, REDIS_PORT


redis_client = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    password=os.getenv("REDIS_PASSWORD"),
    ssl=os.getenv("REDIS_TLS", "false").lower() == "true",
    decode_responses=True
)


def save_submission(submission_id: str, data: dict, ttl=1800):
    redis_client.set(
        submission_id,
        json.dumps(data),
        ex=int(ttl)
    )


def get_submission(submission_id: str):
    data = redis_client.get(submission_id)
    if not data:
        return None
    return json.loads(data)


def update_submission(submission_id: str, updates: dict):
    existing = get_submission(submission_id)
    if not existing:
        return False

    existing.update(updates)
    save_submission(submission_id, existing)
    return True
