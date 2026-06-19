from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, database, schemas

from pydantic import BaseModel
from typing import Optional
from datetime import date

router = APIRouter(prefix="/api/proyectos", tags=["Proyectos"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Ruta Post para nuevo proyecto
@router.post("/", response_model=schemas.ProyectoResponse)
def crear_producto(proyecto: schemas.ProyectoCreate, db: Session = Depends(get_db)):
    nuevoProyecto = models.Proyecto(
        nombre = proyecto.nombre,
        costo_base = proyecto.costo_base,
        fecha_inicio = proyecto.fecha_inicio,
        fecha_fin = proyecto.fecha_fin
    )

    # Add project
    db.add(nuevoProyecto)
    db.commit()
    db.refresh(nuevoProyecto)

    return nuevoProyecto

# Ruta Get para todos los proyectos 
@router.get("/", response_model=list[schemas.ProyectoResponse])
def read_items(db: Session = Depends(get_db)):
    return db.query(models.Proyecto).all()