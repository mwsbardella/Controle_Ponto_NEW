from sqlalchemy import Column, Integer, String, Time, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Jornada(Base):
    __tablename__ = "gt_jornada"
    id = Column(Integer, primary_key=True, index=True)
    descricao = Column(String, nullable=False)
    horarios = relationship("Horario", back_populates="jornada")

class Horario(Base):
    __tablename__ = "gt_jornada_horarios"
    id = Column(Integer, primary_key=True, index=True)
    jornada_id = Column(Integer, ForeignKey("gt_jornada.id"))
    dia_semana = Column(String, nullable=False)
    entrada = Column(Time)
    saida = Column(Time)
    jornada = relationship("Jornada", back_populates="horarios")
