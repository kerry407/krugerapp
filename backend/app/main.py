from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.forms import router as form_router

app = FastAPI()

# Allowed origins
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5501",      # VS Code Live Server
    "http://localhost:5501",
    "https://viebaccount.netlify.app",
    "https://staging.d2qq13mzk8bwnb.amplifyapp.com",
    "https://viebaccount.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(form_router, prefix="/form")
