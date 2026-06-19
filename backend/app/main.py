# Importacion de librerias
import os
from dotenv import load_dotenv
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

# Importacion de modelos
from . import models
from .database import Base, engine

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

@app.head("/", summary="Root HEAD endpoint", tags=["general"])
def root_head():
    # HEAD no devuelve body, solo headers
    return Response(
        status_code=200,
        headers={
            "X-Service": "Apps Backend",
            "X-Version": "1.0.0",
            "X-Message": "Bienvenido - API activa"
        }
    )

@app.get("api/health")
def health_check():
    return {"status": "ok", "message": "Backend funcionando correctamente"}