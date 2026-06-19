from pydantic import BaseModel, conint
from typing import List, Optional
from datetime import date

class MaterialCreate(BaseModel):
    nombre: str
    cantidad: conint(gt=0)

class AvanceCreate(BaseModel):
    fecha: date
    porcentaje_avance: conint(ge=0, le=100)
    notas: Optional[str]
    materiales: List[MaterialCreate]

class AvanceResponse(AvanceCreate):
    id: int
    costos_estimado: float

    class Config:
        from_attributes = True