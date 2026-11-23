let etapaAtual = 0;
const etapas = document.querySelectorAll('.etapa');
const textoStatus = document.getElementById('texto-status');
const mensagemMeta = document.getElementById('mensagem-meta');
const btnBeber = document.querySelector('button:not(.reset)');

const PASSO = 500;
const META = etapas.length * PASSO;

function beberAgua() {
  if (etapaAtual < etapas.length) {
    etapas[etapaAtual].classList.add('concluida');
    etapaAtual++;
    textoStatus.textContent = `${etapaAtual * PASSO} / ${META} ml`;
  }

  if (etapaAtual === etapas.length) {
    mensagemMeta.hidden = false;
    btnBeber.disabled = true;
  }
}

function resetar() {
  etapas.forEach(etapa => etapa.classList.remove('concluida'));
  etapaAtual = 0;
  textoStatus.textContent = `0 / ${META} ml`;
  mensagemMeta.hidden = true;
  btnBeber.disabled = false;
}