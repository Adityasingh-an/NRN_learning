from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Form
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import User, Category, Course, SystemSetting
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import os
import shutil
import time

router = APIRouter()

UPLOAD_DIR = "static/uploads"

# ----------------- SECURITY SCHEMA -----------------
class AdminLoginRequest(BaseModel):
    email: str
    password: str

class UserAdminResponse(BaseModel):
    id: int
    nrn_id: str
    full_name: str
    email: Optional[str] = None
    created_at: datetime
    class Config:
        from_attributes = True

# ----------------- COURSE/CAT SCHEMAS -----------------
class CategoryCreate(BaseModel):
    name: str
    description: Optional[str] = None

class CourseCreate(BaseModel):
    title: str
    category_id: int
    description: Optional[str] = None
    file_url: Optional[str] = None
    content_type: Optional[str] = None

class SystemSettingUpdate(BaseModel):
    key: str
    value: str

@router.post("/login")
def admin_login(request: AdminLoginRequest):
    from app.core.config import settings
    if request.email == settings.ADMIN_EMAIL and request.password == settings.ADMIN_PASS:
        return {"status": "success", "message": "Authenticated"}
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Administrative Credentials"
        )

# ----------------- USERS -----------------
@router.get("/users", response_model=List[UserAdminResponse])
def get_all_users(db: Session = Depends(get_db)):
    return db.query(User).all()

# ----------------- CATEGORIES -----------------
@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()

@router.post("/categories")
def create_category(cat: CategoryCreate, db: Session = Depends(get_db)):
    db_cat = Category(name=cat.name, description=cat.description)
    db.add(db_cat)
    db.commit()
    db.refresh(db_cat)
    return db_cat

# ----------------- COURSES -----------------
@router.get("/courses")
def get_courses(db: Session = Depends(get_db)):
    return db.query(Course).all()

@router.post("/courses/upload")
async def upload_course_file(file: UploadFile = File(...)):
    try:
        # Create unique filename
        filename = f"{int(time.time())}_{file.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Return the public URL
        file_url = f"http://localhost:8000/static/uploads/{filename}"
        return {"file_url": file_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/courses")
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    db_course = Course(**course.model_dump())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

@router.delete("/courses/{course_id}")
def delete_course(course_id: int, db: Session = Depends(get_db)):
    db_course = db.query(Course).filter(Course.id == course_id).first()
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    db.delete(db_course)
    db.commit()
    return {"message": "Course deleted successfully"}

# ----------------- SYSTEM SETTINGS -----------------
@router.get("/settings/{key}")
def get_setting(key: str, db: Session = Depends(get_db)):
    setting = db.query(SystemSetting).filter(SystemSetting.key == key).first()
    if not setting:
        return {"key": key, "value": "[]"} # Default to empty JSON array
    return setting

@router.post("/settings")
def update_setting(setting: SystemSettingUpdate, db: Session = Depends(get_db)):
    db_setting = db.query(SystemSetting).filter(SystemSetting.key == setting.key).first()
    if db_setting:
        db_setting.value = setting.value
    else:
        db_setting = SystemSetting(key=setting.key, value=setting.value)
        db.add(db_setting)
    db.commit()
    return {"message": "Setting updated successfully"}
