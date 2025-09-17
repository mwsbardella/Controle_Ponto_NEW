from pydantic import BaseModel
from typing import List
from datetime import time

class HorarioCreate(BaseModel):
    dia_semana: str
    entrada: time
    saida: time

class JornadaCreate(BaseModel):
    descricao: str
    horarios: List[HorarioCreate]

class HorarioResponse(HorarioCreate):
    id: int

class JornadaResponse(BaseModel):
    id: int
    descricao: str
    horarios: List[HorarioResponse]
