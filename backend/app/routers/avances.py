from typing import List
from sqlalchemy.orm import Session
from .. import models, schemas, database
from fastapi import APIRouter, Depends, HTTPException

router = APIRouter(prefix="/api/proyectos", tags=["Avances"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/{id}/avances", response_model=schemas.AvanceResponse)
def crear_avance(id: int, avance: schemas.AvanceCreate, db: Session = Depends(get_db)):
    
    # Obtener proyecto por ID
    proyecto = db.query(models.Proyecto).filter(models.Proyecto.id == id).first()

    if not proyecto:
        raise HTTPException(status_code=404, detail=("Proyecto no encontrado"))

    # Crear costo estimado con formula de prueba
    costos_estimado = proyecto.costo_base * (avance.porcentaje_avance / 100)

    nuevo_avance = models.Avance(
        proyecto_id = id,
        fecha = avance.fecha,
        porcentaje_avance = avance.porcentaje_avance,
        notas = avance.notas,
        costo_estimado = costos_estimado
    ) 

    #Agregar avance en db
    db.add(nuevo_avance)
    db.commit()
    db.refresh(nuevo_avance)

    # Creacion de lista de materiales
    for mat in avance.materiales:
        nuevo_material = models.Material(
            avance_id = nuevo_avance.id,
            nombre = mat.nombre,
            cantidad = mat.cantidad
        )
        #Agregar material en db
        db.add(nuevo_material)
    db.commit()
    db.refresh(nuevo_avance)

    return nuevo_avance


@router.get("/{project_id}/avances", response_model=List[schemas.AvanceResponse])
def get_avances(project_id: int, db: Session = Depends(get_db)):

    # Validacion de que existe proyecto
    proyecto = db.query(models.Proyecto).filter(models.Proyecto.id == project_id).first()

    if not proyecto:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    
    # Obtener avances ligados
    avances = db.query(models.Avance).filter(models.Avance.proyecto_id == project_id).all()
    return avances
