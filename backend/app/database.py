import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Get DATABASE URL FROM env
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./erp.db")

# Connecction Engine
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

# Sesion para interactual con la db
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para modelos
Base = declarative_base()

