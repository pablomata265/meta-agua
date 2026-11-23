const PASSO = 500;
const CHAVE_DIAS = 'metaAgua:dias';
const CHAVE_HOJE = 'metaAgua:hoje';

const etapas = document.querySelectorAll('.etapa');
const textoStatus = document.getElementById('texto-status');
const mensagemMeta = document.getElementById('mensagem-meta');
const btnBeber = document.querySelector('button:not(.reset)');
const contadorDias = document.getElementById('contador-dias');
const listaDias = document.getElementById('lista-dias');

const META = etapas.length * PASSO;
let etapaAtual = 0;

// Data local no formato AAAA-MM-DD
function hojeISO() {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${dia}`;
}

function formatarData(iso) {
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
}

function lerDias() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_DIAS)) || [];
  } catch (e) {
    return [];
  }
}

function salvarDias(dias) {
  try {
    localStorage.setItem(CHAVE_DIAS, JSON.stringify(dias));
  } catch (e) {}
}

function salvarHoje() {
  try {
    localStorage.setItem(CHAVE_HOJE, JSON.stringify({ data: hojeISO(), etapa: etapaAtual }));
  } catch (e) {}
}

function carregarHoje() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_HOJE));
    if (salvo && salvo.data === hojeISO()) {
      etapaAtual = Math.min(salvo.etapa, etapas.length);
    }
  } catch (e) {}
}

function registrarDia() {
  const dias = lerDias();
  const hoje = hojeISO();
  if (!dias.includes(hoje)) {
    dias.push(hoje);
    salvarDias(dias);
  }
}

function mostrarHistorico() {
  const dias = lerDias().sort().reverse();
  listaDias.innerHTML = '';
  dias.forEach(iso => {
    const li = document.createElement('li');
    li.textContent = formatarData(iso);
    listaDias.appendChild(li);
  });
  contadorDias.textContent =
    dias.length === 0
      ? 'Nenhum dia ainda. Bora bater a primeira meta!'
      : `Total: ${dias.length} ${dias.length === 1 ? 'dia' : 'dias'}`;
}

function atualizarTela() {
  etapas.forEach((etapa, i) => {
    etapa.classList.toggle('concluida', i < etapaAtual);
  });
  textoStatus.textContent = `${etapaAtual * PASSO} / ${META} ml`;
  const bateuMeta = etapaAtual === etapas.length;
  mensagemMeta.hidden = !bateuMeta;
  btnBeber.disabled = bateuMeta;
  mostrarHistorico();
}

function beberAgua() {
  if (etapaAtual < etapas.length) {
    etapaAtual++;
    salvarHoje();
    if (etapaAtual === etapas.length) registrarDia();
    atualizarTela();
  }
}

function resetar() {
  etapaAtual = 0;
  salvarHoje();
  atualizarTela();
}

carregarHoje();
atualizarTela();