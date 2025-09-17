from fastapi import FastAPI
from app.routes import router
from app.database import create_tables

app = FastAPI(title="Controle de Ponto API")

app.include_router(router)

@app.on_event("startup")
def startup():
    create_tables()
