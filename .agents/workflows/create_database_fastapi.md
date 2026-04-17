---
description: How to Create a SQLite Database & Auth in FastAPI
---
# Creating a SQL Database flow in FastAPI

This workflow maps exactly what we did to build the completely secure User Database system for the NRN Smart Learning application!

## Step 1: Install Required Architectures
FastAPI requires external libraries to manage SQL databases and encrypt passwords securely.
// turbo
1. Run pip install for `sqlalchemy`, `bcrypt`, `passlib[bcrypt]`, and `pyjwt` inside your backend virtual environment:
```bash
python -m pip install sqlalchemy bcrypt passlib[bcrypt] pyjwt
```

## Step 2: Establish the Database Connection (`database.py`)
You must define the engine that talks to your SQLite database file. We create a `SessionLocal` class which provides independent sessions for each request.

Create `backend/app/database.py` and write:
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./nrn_learning.db"

# connect_args={"check_same_thread": False} is required exclusively for SQLite
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# This is a dependency we use everywhere in our API routes!
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

## Step 3: Define Your SQL Models (`models.py`)
Instead of manually typing SQL commands like `CREATE TABLE`, SQLAlchemy allows us to build "Python Classes" that generate the tables for us automatically. 

Create `backend/app/models/models.py`:
```python
from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nrn_id = Column(String, unique=True, index=True) 
    full_name = Column(String)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
```

## Step 4: Write the API Endpoints (`routes/auth.py`)
Now that the database exists, we need an entry point for `Login` and `Register`. 
We pull the `db: Session = Depends(get_db)` to automatically open and close our database securely!

```python
@router.post("/register")
def register_user(request: RegisterRequest, db: Session = Depends(get_db)):
    # 1. We algorithmically generate the NRN ID
    new_nrn_id = generate_nrn_id(db)
    
    # 2. We HASH the password with bcrypt (never store plain text!)
    hashed_pwd = get_password_hash(request.password)
    
    # 3. We Insert it into the SQLite File using our Model
    db_user = User(
        nrn_id=new_nrn_id,
        full_name=request.full_name,
        hashed_password=hashed_pwd
    )
    db.add(db_user)
    db.commit()
    return {"message": "User created", "nrn_id": new_nrn_id}
```

## Step 5: Mount to the Main App (`main.py`)
Finally, we make sure the tables are physically built on server startup by adding one line to our FastAPI bootstrapper:
```python
from app.database import engine, Base

# Build tables in sqlite.db
Base.metadata.create_all(bind=engine)
```
