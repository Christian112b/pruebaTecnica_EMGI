# Importacion de librerias
import os
from fastapi import FastAPI
from dotenv import load_dotenv
from .database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

# Importacion de modelos
from . import models

# Importacion de routers
from .routers import avances
from .routers import proyectos

load_dotenv()

app = FastAPI(title="ERP Avances de Obra")

origins_env = os.getenv("CORS_ORIGINS", "")
origins = [origin.strip() for origin in origins_env.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Crear tablas auto al iniciar
Base.metadata.create_all(bind=engine)

# Routers
app.include_router(proyectos.router)
app.include_router(avances.router)

@app.get("/")
def root():
    return {"message": "Backend Listo"}