from pydantic import BaseModel
from typing import List
from datetime import time

class HorarioCreate(BaseModel):
    dia_semana: str
    entrada: time
    saida: time

class HorarioResponse(HorarioCreate):
    id: int

class JornadaCreate(BaseModel):
    descricao: str
    ativo: str
    horarios: List[HorarioCreate]

class JornadaResponse(BaseModel):
    id: int
    descricao: str
    ativo: str
    horarios: List[HorarioResponse]