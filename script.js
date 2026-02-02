const diasSemana = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];

/* ===== ABAS ===== */
function abrirTreino() {
  document.getElementById('treino').classList.add('active');
  document.getElementById('dieta').classList.remove('active');
}

function abrirDieta() {
  document.getElementById('dieta').classList.add('active');
  document.getElementById('treino').classList.remove('active');
}

/* ===== LOCAL STORAGE ===== */
function salvar(key, valor) {
  localStorage.setItem(key, JSON.stringify(valor));
}

function carregar(key, padrao) {
  return JSON.parse(localStorage.getItem(key)) ?? padrao;
}

/* ===== CALENDÁRIO TREINO ===== */
function criarCalendarioTreino() {
  const c = document.getElementById('calendarioTreino');
  const feitos = JSON.parse(localStorage.getItem('treinoDias')) || [];
  let strike = feitos.length;

  const estados = ['','🔥']; // vazio ou foguinho

  // Cabeçalho dos dias da semana
  diasSemana.forEach(d => {
    const s = document.createElement('div');
    s.className = 'dia-semana';
    s.textContent = d;
    c.appendChild(s);
  });

  for (let i = 1; i <= 30; i++) {
    const d = document.createElement('div');
    d.className = 'dia';

    // Se já foi feito, mostra o foguinho
    if (feitos.includes(i)) {
      d.classList.add('feito');
      d.textContent = `${i} ${estados[1]}`;
    } else {
      d.textContent = i;
    }

    // Clique para alternar
    d.onclick = () => {
      d.classList.toggle('feito');
      const atualizados = [...document.querySelectorAll('#calendarioTreino .dia.feito')]
        .map(el => Number(el.textContent));

      // Atualiza texto com foguinho ou só o número
      if (d.classList.contains('feito')) {
        d.textContent = `${i} ${estados[1]}`;
      } else {
        d.textContent = i;
      }

      localStorage.setItem('treinoDias', JSON.stringify(atualizados));
      document.getElementById('strike').textContent = atualizados.length;
    };

    c.appendChild(d);
  }

  // Atualiza o contador de strike
  const strikeEl = document.getElementById('strike');
  if(strikeEl) strikeEl.textContent = strike;
}

/* ===== CALENDÁRIO HUMOR ===== */
function criarCalendarioHumor() {
  const c = document.getElementById('calendarioHumor');
  const dados = carregar('humorDias', {});
  const estados = ['','🌸','🌼','🥀'];

  diasSemana.forEach(d => {
    const s = document.createElement('div');
    s.className = 'dia-semana';
    s.textContent = d;
    c.appendChild(s);
  });

  for (let i = 1; i <= 30; i++) {
    const d = document.createElement('div');
    d.className = 'dia';

    let estado = dados[i] ?? 0;
    d.textContent = `${i} ${estados[estado]}`;

    d.onclick = () => {
      estado = (estado + 1) % estados.length;
      dados[i] = estado;
      d.textContent = `${i} ${estados[estado]}`;
      salvar('humorDias', dados);
    };

    c.appendChild(d);
  }
}

/* ===== TEXTOS ===== */
['textoTreino','textoDieta','textoNotas'].forEach(id => {
  const el = document.getElementById(id);
  el.value = carregar(id, '');
  el.oninput = () => salvar(id, el.value);
});

/* INIT */
criarCalendarioTreino();
criarCalendarioHumor();