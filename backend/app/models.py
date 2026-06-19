from sqlalchemy import Column, Integer, String, Date, ForeignKey, Float, Text
from sqlalchemy.orm import relationship
from .database import Base

class Proyecto(Base):
    __tablename__ = "proyectos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable = False)
    costo_base = Column(Float, default=0)
    fecha_inicio = Column(Date)
    fecha_fin = Column(Date)

    # Relacion con avance
    avances = relationship("Avance", back_populates="proyecto", cascade="all, delete-orphan")


class Avance(Base):
    __tablename__ = "avances"

    id = Column(Integer, primary_key=True, index=True)
    proyecto_id = Column(Integer, ForeignKey("proyectos.id"))
    fecha = Column(Date, nullable=False)
    porcentaje_avance = Column(Integer, nullable=False)
    notas = Column(Text)
    costo_estimado = Column(Float)

    # Relación con proyecto
    proyecto = relationship("Proyecto", back_populates="avances")
    # Relación con materiales
    materiales = relationship("Material", back_populates="avance", cascade="all, delete-orphan")

class Material(Base):
    __tablename__ = "materiales"

    id = Column(Integer, primary_key=True, index=True)
    avance_id = Column(Integer, ForeignKey("avances.id"))
    nombre = Column(String, nullable=False)
    cantidad = Column(Integer, nullable=False)

    # Relación con avance
    avance = relationship("Avance", back_populates="materiales")