from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas

router = APIRouter()

@router.post("/jornadas", response_model=schemas.JornadaResponse)
def criar_jornada(jornada: schemas.JornadaCreate, db: Session = Depends(get_db)):
    nova_jornada = models.Jornada(descricao=jornada.descricao)
    db.add(nova_jornada)
    db.commit()
    db.refresh(nova_jornada)

    for h in jornada.horarios:
        horario = models.Horario(
            jornada_id=nova_jornada.id,
            dia_semana=h.dia_semana,
            entrada=h.entrada,
            saida=h.saida
        )
        db.add(horario)
    db.commit()

    nova_jornada.horarios = db.query(models.Horario).filter_by(jornada_id=nova_jornada.id).all()
    return nova_jornada

@router.get("/jornadas", response_model=List[schemas.JornadaResponse])
def listar_jornadas(db: Session = Depends(get_db)):
    jornadas = db.query(models.Jornada).all()
    for j in jornadas:
        j.horarios = db.query(models.Horario).filter_by(jornada_id=j.id).all()
    return jornadas
