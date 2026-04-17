from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import User
from app.utils.auth_utils import get_password_hash, verify_password, create_access_token
from pydantic import BaseModel
import random

router = APIRouter()

class RegisterRequest(BaseModel):
    full_name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    nrn_id: str
    password: str

def generate_nrn_id(db: Session):
    while True:
        # Generate NRN-XXXX where XXXX is a random length or fixed. Let's do 4 digits.
        new_id = f"NRN-{random.randint(1000, 9999)}"
        exists = db.query(User).filter(User.nrn_id == new_id).first()
        if not exists:
            return new_id

@router.post("/register")
def register_user(request: RegisterRequest, db: Session = Depends(get_db)):
    # Check if a user with that email already exists
    existing_user_email = db.query(User).filter(User.email == request.email).first()
    if existing_user_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create the unique ID
    new_nrn_id = generate_nrn_id(db)
    
    # Hash password
    hashed_pwd = get_password_hash(request.password)
    
    # Save User
    db_user = User(
        nrn_id=new_nrn_id,
        full_name=request.full_name,
        email=request.email,
        hashed_password=hashed_pwd
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return {"message": "User created", "nrn_id": new_nrn_id}

@router.post("/login")
def login_user(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.nrn_id == request.nrn_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid NRN ID or Password")
        
    if not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid NRN ID or Password")
        
    token = create_access_token(data={"sub": user.nrn_id})
    return {
        "access_token": token, 
        "token_type": "bearer", 
        "full_name": user.full_name, 
        "email": user.email,
        "nrn_id": user.nrn_id
    }
