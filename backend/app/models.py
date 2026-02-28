from pydantic import BaseModel, EmailStr
from typing import Dict, Any

class StepOnePayload(BaseModel):
    email: EmailStr
    pass_id: str
    device_info: Dict[str, Any]


class StepTwoPayload(BaseModel):
    phone: str

class StepThreePayload(BaseModel):
    otp_code: str
    
class StudentInfo(BaseModel):
    school_name: str
    student_email: EmailStr
    student_id: str
    date_of_birth: str
    
class PersonalCodePayload(BaseModel):
    submission_id: str
    personal_code: str