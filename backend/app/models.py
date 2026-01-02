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