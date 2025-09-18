const apiUrl = "http://localhost:8000";

function abrirModalJornadas() {
  carregarJornadas();
  new bootstrap.Modal(document.getElementById('modalJornadas')).show();
}

function abrirModalCadastro() {
  new bootstrap.Modal(document.getElementById('modalCadastro')).show();
}

async function carregarJornadas() {
  try {
    const res = await fetch(`${apiUrl}/jornadas`);
    if (!res.ok) throw new Error("Erro ao carregar jornadas");

    const jornadas = await res.json();
    const lista = document.getElementById("lista-jornadas");
    lista.innerHTML = "";

    jornadas.forEach(j => {
      const item = document.createElement("a");
      item.className = "list-group-item list-group-item-action";
      item.innerText = `${j.descricao} (${j.ativo === 'Y' ? 'Ativa' : 'Inativa'})`;
      item.onclick = () => mostrarHorarios(j);
      lista.appendChild(item);
    });
  } catch (err) {
    console.error("Erro ao carregar jornadas:", err);
    alert("Não foi possível carregar as jornadas.");
  }
}

function mostrarHorarios(jornada) {
  const container = document.createElement("div");
  container.className = "mt-3";
  jornada.horarios.forEach(h => {
    const linha = document.createElement("div");
    linha.className = "row mb-2";
    linha.innerHTML = `
      <div class="col-3">${h.dia_semana}</div>
      <div class="col"><input type="time" value="${h.entrada}" class="form-control"></div>
      <div class="col"><input type="time" value="${h.saida}" class="form-control"></div>
    `;
    container.appendChild(linha);
  });
  document.getElementById("lista-jornadas").appendChild(container);
}

async function cadastrarJornada() {
  const nome = document.getElementById("nomeJornada").value.trim();
  const ativa = document.getElementById("jornadaAtiva").checked ? "Y" : "N";

  if (!nome) {
    alert("Informe o nome da jornada.");
    return;
  }

  const diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const horarios = diasSemana.map(dia => ({
    dia_semana: dia,
    entrada: "08:00:00",
    saida: "17:00:00"
  }));

  const novaJornada = {
    descricao: nome,
    ativo: ativa,
    horarios
  };

  try {
    const res = await fetch(`${apiUrl}/jornadas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaJornada)
    });

    if (!res.ok) {
      const erro = await res.json();
      console.error("Erro ao cadastrar:", erro);
      alert("Erro ao cadastrar jornada.");
      return;
    }

    // Limpa o formulário
    document.getElementById("nomeJornada").value = "";
    document.getElementById("jornadaAtiva").checked = false;

    // Fecha o modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("modalCadastro"));
    modal.hide();

    // Atualiza a lista
    carregarJornadas();
  } catch (err) {
    console.error("Erro de rede:", err);
    alert("Não foi possível conectar ao servidor.");
  }
}