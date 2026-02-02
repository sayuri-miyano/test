// Abas
const abaTreino = document.getElementById("abaTreino");
const abaDieta = document.getElementById("abaDieta");
const conteudoTreino = document.getElementById("conteudoTreino");
const conteudoDieta = document.getElementById("conteudoDieta");

abaTreino.addEventListener("click", () => {
  abaTreino.classList.add("active");
  abaDieta.classList.remove("active");
  conteudoTreino.style.display = "flex";
  conteudoDieta.style.display = "none";
});

abaDieta.addEventListener("click", () => {
  abaDieta.classList.add("active");
  abaTreino.classList.remove("active");
  conteudoDieta.style.display = "flex";
  conteudoTreino.style.display = "none";
});

// Função calendário com navegação e dias da semana
class Calendario {
  constructor(containerId, mesSpanId, emoji, diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]) {
    this.container = document.getElementById(containerId);
    this.mesSpan = document.getElementById(mesSpanId);
    this.emoji = emoji;
    this.diasSemana = diasSemana;
    this.dataAtual = new Date();
    this.render();
  }

  render() {
    this.mesSpan.textContent = this.dataAtual.toLocaleString("pt-BR", { month: "long", year: "numeric" });
    this.container.innerHTML = "";

    // Dias da semana
    this.diasSemana.forEach(dia => {
      const divDia = document.createElement("div");
      divDia.textContent = dia;
      divDia.classList.add("dias-semana");
      this.container.appendChild(divDia);
    });

    const ano = this.dataAtual.getFullYear();
    const mes = this.dataAtual.getMonth();
    const primeiroDiaSemana = new Date(ano, mes, 1).getDay(); // 0 = Domingo
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();

    // Preencher dias em branco até o primeiro dia
    let startOffset = primeiroDiaSemana === 0 ? 6 : primeiroDiaSemana - 1; // Seg = 0
    for (let i = 0; i < startOffset; i++) {
      const vazio = document.createElement("div");
      this.container.appendChild(vazio);
    }

    // Dias do mês
    for (let i = 1; i <= diasNoMes; i++) {
      const dia = document.createElement("div");
      dia.textContent = i;

      const saved = localStorage.getItem(`${this.container.id}-${ano}-${mes}-${i}`);
      if (saved) dia.textContent += saved;

      dia.addEventListener("click", () => {
        let current = dia.textContent.replace(/\d+/,"");
        current = current ? "" : this.emoji;
        dia.textContent = i + current;
        localStorage.setItem(`${this.container.id}-${ano}-${mes}-${i}`, current);
      });

      this.container.appendChild(dia);
    }
  }

  mesAnterior() {
    this.dataAtual.setMonth(this.dataAtual.getMonth() - 1);
    this.render();
  }

  proximoMes() {
    this.dataAtual.setMonth(this.dataAtual.getMonth() + 1);
    this.render();
  }
}

// Inicializar calendários
const calendarioTreino = new Calendario("calendarioTreino", "mesTreino", "🔥");
const calendarioDieta = new Calendario("calendarioDieta", "mesDieta", "🌸");

// Navegação
document.getElementById("prevTreino").addEventListener("click", () => calendarioTreino.mesAnterior());
document.getElementById("nextTreino").addEventListener("click", () => calendarioTreino.proximoMes());
document.getElementById("prevDieta").addEventListener("click", () => calendarioDieta.mesAnterior());
document.getElementById("nextDieta").addEventListener("click", () => calendarioDieta.proximoMes());

// Botões Salvar / Excluir Treino
const treinoEditavel = document.getElementById("treinoEditavel");
document.getElementById("salvarTreino").addEventListener("click", () => {
  localStorage.setItem("treinoNotas", treinoEditavel.value);
  alert("Treino salvo!");
});
document.getElementById("excluirTreino").addEventListener("click", () => {
  treinoEditavel.value = "";
  localStorage.removeItem("treinoNotas");
});

// Botões Salvar / Excluir Dieta
const dietaNotas = document.getElementById("dietaNotas");
document.getElementById("salvarDieta").addEventListener("click", () => {
  localStorage.setItem("dietaNotas", dietaNotas.value);
  alert("Dieta salva!");
});
document.getElementById("excluirDieta").addEventListener("click", () => {
  dietaNotas.value = "";
  localStorage.removeItem("dietaNotas");
});

// Carregar notas salvas
window.addEventListener("load", () => {
  const savedTreino = localStorage.getItem("treinoNotas");
  if (savedTreino) treinoEditavel.value = savedTreino;

  const savedDieta = localStorage.getItem("dietaNotas");
  if (savedDieta) dietaNotas.value = savedDieta;
});