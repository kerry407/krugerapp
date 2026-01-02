from fastapi import Request


def extract_server_device_info(request: Request):
    return {
        "ip": request.client.host if request.client else None,
        "user_agent": request.headers.get("user-agent"),
        "accept_language": request.headers.get("accept-language"),
    }
