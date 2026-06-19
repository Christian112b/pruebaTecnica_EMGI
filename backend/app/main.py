# Importacion de librerias
from fastapi import FastAPI
from .database import Base, engine

# Importacion de modelos
from . import models

# Importacion de routes
from .routers import avances


app = FastAPI(title="ERP Avances de Obra")

# Crear tablas auto al iniciar
Base.metadata.create_all(bind=engine)

app.include_router(avances.router)

@app.get("/")
def root():
    return {"message": "Backend Listo"}