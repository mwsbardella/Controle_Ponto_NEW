const apiUrl = "http://localhost:8000";

async function carregarJornadas() {
  const res = await fetch(`${apiUrl}/jornadas`);
  const jornadas = await res.json();
  const container = document.getElementById("jornadas");
  container.innerHTML = jornadas.map(j => `
    <div class="card mt-2">
      <div class="card-body">
        <h5>${j.descricao}</h5>
        <ul>${j.horarios.map(h => `<li>${h.dia_semana}: ${h.entrada} - ${h.saida}</li>`).join("")}</ul>
      </div>
    </div>
  `).join("");
}

document.getElementById("form-jornada").addEventListener("submit", async e => {
  e.preventDefault();
  const descricao = document.getElementById("descricao").value;
  const novaJornada = {
    descricao,
    horarios: [] // você pode adicionar lógica para incluir horários
  };
  await fetch(`${apiUrl}/jornadas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novaJornada)
  });
  carregarJornadas();
});

carregarJornadas();
