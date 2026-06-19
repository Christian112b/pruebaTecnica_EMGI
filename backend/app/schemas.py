from pydantic import BaseModel, conint
from typing import List, Optional
from datetime import date

# Schemas de Proyectos
class ProyectoCreate(BaseModel):
    nombre: str
    costo_base: float
    fecha_inicio: Optional[date]
    fecha_fin: Optional[date]

class ProyectoResponse(ProyectoCreate):
    id: int
    class Config:
        from_attributes = True


# Schemas de Materiales
class MaterialCreate(BaseModel):
    nombre: str
    cantidad: conint(gt=0)


# Schemas de Avance
class AvanceCreate(BaseModel):
    fecha: date
    porcentaje_avance: conint(ge=0, le=100)
    notas: Optional[str]
    materiales: List[MaterialCreate]

class AvanceResponse(AvanceCreate):
    id: int
    costo_estimado: float

    class Config:
        from_attributes = True
