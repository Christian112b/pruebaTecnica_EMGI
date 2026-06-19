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

    return {
        "id": nuevoProyecto.id,
        "nombre": nuevoProyecto.nombre,
        "costo_base": nuevoProyecto.costo_base,
        "fecha_inicio": nuevoProyecto.fecha_inicio,
        "fecha_fin": nuevoProyecto.fecha_fin,
        "porcentaje_avance": 0
    }

# Ruta Get para todos los proyectos 
@router.get("/", response_model=list[schemas.ProyectoResponse])
def read_items(db: Session = Depends(get_db)):
    proyectos = db.query(models.Proyecto).all()
    proyectos_con_avance = []

    for p in proyectos:
        # Buscar el último avance por fecha
        ultimo_avance = (
            db.query(models.Avance)
            .filter(models.Avance.proyecto_id == p.id)
            .order_by(models.Avance.fecha.desc())
            .first()
        )

        porcentaje = ultimo_avance.porcentaje_avance if ultimo_avance else 0

        proyectos_con_avance.append({
            "id": p.id,
            "nombre": p.nombre,
            "costo_base": p.costo_base,
            "fecha_inicio": p.fecha_inicio,
            "fecha_fin": p.fecha_fin,
            "porcentaje_avance": porcentaje
        })

    return proyectos_con_avance

# Ruta Get para un proyecto por ID
@router.get("/{project_id}", response_model=schemas.ProyectoResponse)
def read_proyecto(project_id: int, db: Session = Depends(get_db)):
    proyecto = db.query(models.Proyecto).filter(models.Proyecto.id == project_id).first()
    if not proyecto:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")

    # Buscar el último avance por fecha
    ultimo_avance = (
        db.query(models.Avance)
        .filter(models.Avance.proyecto_id == proyecto.id)
        .order_by(models.Avance.fecha.desc())
        .first()
    )

    porcentaje = ultimo_avance.porcentaje_avance if ultimo_avance else 0

    return {
        "id": proyecto.id,
        "nombre": proyecto.nombre,
        "costo_base": proyecto.costo_base,
        "fecha_inicio": proyecto.fecha_inicio,
        "fecha_fin": proyecto.fecha_fin,
        "porcentaje_avance": porcentaje
    }


# Ruta DELETE para proyecto por ID
@router.delete("/{project_id}", status_code=204)
def delete_proyecto(project_id: int, db: Session = Depends(get_db)):
    proyecto = db.query(models.Proyecto).filter(models.Proyecto.id == project_id).first()
    if not proyecto:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")

    db.delete(proyecto)   # Esto dispara el cascade si está configurado en el modelo
    db.commit()
    return {"detail": "Proyecto eliminado correctamente"}