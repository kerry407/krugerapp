import redis
import json

redis_client = redis.Redis(host="localhost", port=6379, decode_responses=True)

def save_submission(submission_id: str, data: dict):
    redis_client.setex(
        submission_id,
        1800,  # 30 minutes expiry
        json.dumps(data)
    )

def get_submission(submission_id: str):
    data = redis_client.get(submission_id)
    return json.loads(data) if data else None

def update_submission(submission_id: str, data: dict):
    save_submission(submission_id, data)
