const texto = document.querySelector("#texto");
const entrada = document.querySelector("#entrada");
const reiniciar = document.querySelector("#reiniciar");
const resultado = document.querySelector("#resultado");
const historico = document.querySelector("#historico");
const alternarbtn = document.querySelector("#alternar-btn");
const alternarTema = document.querySelector("#alternar-tema");

const body = document.body;

const arrText = [
    "Digitando texto para testar suas habilidades.",
    "Mais um texto para provar sua rapidez em digitação.",
    "Digite isto",
    "Consegue digitar este texto mais rapidamente, ou vai ter que treinar mais?",
    "Nunca desista, seja persistente, estude bastante porque a recompensa virá!"
];
// =============Funções===========

function novoTexto() {
    const index = Math.floor( Math.random() * arrText.length);
    texto.textContent = arrText[index];
};

function atualizarTeste() {
  iniciar();

  if(entrada.value === texto.textContent) {
    verificar();
  }
};

function iniciar() {
    const statusDoTeste = JSON.parse(localStorage.getItem('testeEmAndamento'));

    if(!statusDoTeste) {
        localStorage.setItem('tempoInicial', new Date().getTime());
        localStorage.setItem('testeEmAndamento', true);
    };
};

function verificar() {
    const tempoFinal = new Date().getTime();
    const tempoInicial = +(localStorage.getItem("tempoInicial"));
    const tempoGasto = (tempoFinal - tempoInicial) / 1000;

    resultado.textContent = `Parabéns vc levou ${tempoGasto} segundos!`;
    adicionarHistorico(texto.textContent, tempoGasto);
    localStorage.setItem('testeEmAndamento', false);
    entrada.value = "";
 
    novoTexto();
};

function adicionarHistorico(textoDigitado, tempoGasto) {
    const itemHistorico = document.createElement("p");
    itemHistorico.textContent = `Texto "${textoDigitado}" - Tempo: ${tempoGasto} segundos.`

    historico.appendChild(itemHistorico);
}
// =============Eventos============


entrada.addEventListener("keyup", atualizarTeste);

// Aternar tema
alternarTema.addEventListener("click", () => {
    body.classList.toggle('escuro');

});

novoTexto();