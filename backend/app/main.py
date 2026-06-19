# Importacion de librerias
from fastapi import FastAPI
from .database import Base, engine

# Importacion de modelos
from . import models

# Importacion de routers
from .routers import avances
from .routers import proyectos

app = FastAPI(title="ERP Avances de Obra")

# Crear tablas auto al iniciar
Base.metadata.create_all(bind=engine)

# Routers
app.include_router(proyectos.router)
app.include_router(avances.router)

@app.get("/")
def root():
    return {"message": "Backend Listo"}