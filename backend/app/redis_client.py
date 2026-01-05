import os
import redis
import json


REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

# 2. Optimized initialization
redis_client = redis.Redis.from_url(
    REDIS_URL,
    decode_responses=True,      # Automatically converts bytes to strings
    health_check_interval=30,   # Keeps the connection alive to prevent timeouts
    socket_connect_timeout=5,   # Fails fast if the server is unreachable
    retry_on_timeout=True       # Automatically retries if a connection drops
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
