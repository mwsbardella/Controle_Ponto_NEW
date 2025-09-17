## 🕒 Sistema de Controle de Ponto

Projeto web para gerenciamento de jornadas de trabalho, desenvolvido com **FastAPI**, **PostgreSQL**, **Docker** e **HTML/JS** no frontend.

### 📦 Tecnologias Utilizadas

- **Backend:** FastAPI (Python)
- **Banco de Dados:** PostgreSQL
- **ORM:** SQLAlchemy
- **Frontend:** HTML + Bootstrap + JavaScript
- **Containerização:** Docker + Docker Compose

---

### 🗃️ Modelagem de Dados

#### 🔹 `gt_jornada`
| Campo           | Tipo        | Descrição               |
|----------------|-------------|-------------------------|
| `gt_jornada_id`| UUID        | Identificador único     |
| `nome`         | VARCHAR(30) | Nome da jornada         |
| `ativo`        | CHAR(1)     | 'Y' (ativa) ou 'N'      |

#### 🔹 `gt_jornada_horarios`
| Campo                   | Tipo        | Descrição                      |
|-------------------------|-------------|--------------------------------|
| `gt_jornada_horarios_id`| UUID        | Identificador único do horário|
| `gt_jornada_id`         | UUID        | FK para jornada                |
| `dia_semana`            | VARCHAR(10) | Domingo a Sábado               |
| `entrada1`, `saida1`    | TIME        | Primeiro turno                 |
| `entrada2`, `saida2`    | TIME        | Segundo turno                  |
| `entrada3`, `saida3`    | TIME        | Terceiro turno                 |

> Ao criar uma jornada, os 7 dias da semana são automaticamente inseridos com campos de horário vazios.

---

### 🖼️ Interface Web

#### Tela Principal
- Lista de jornadas cadastradas
- Botões: Nova Jornada, Deletar Jornada
- Formulário para nova jornada (nome + checkbox de ativo)
- Tabela de horários (Domingo a Sábado, até 3 turnos por dia)

---

### 🐳 Ambiente Docker

#### `docker-compose.yml`
- Serviço `db`: PostgreSQL
- Serviço `backend`: FastAPI
- Variáveis de ambiente para conexão com o banco

#### `Dockerfile` (backend)
- Python 3.11
- Instala dependências via `requirements.txt`
- Executa FastAPI com Uvicorn

---

### 🚀 Como Rodar

1. Instale o Docker
2. Clone o repositório e navegue até a pasta `controle-ponto`
3. Execute:
   ```bash
   docker-compose up --build
   ```
4. Acesse a API: [http://localhost:8000/docs](http://localhost:8000/docs)
5. Abra o `index.html` no navegador para visualizar o frontend

---

### 📌 Status Atual

✅ Backend funcional com criação/listagem de jornadas  
✅ Frontend básico com interface interativa  
🔜 Próximos passos:
- Listar e editar horários (`gt_jornada_horarios`)
- Persistir alterações dos horários via API
- Deletar jornada
- Servir frontend via Docker
