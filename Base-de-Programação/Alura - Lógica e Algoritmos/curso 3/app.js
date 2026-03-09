let listaDeNumerosSorteados = [];
let numLimite = 10 + 1;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

exibirTextoNaTela('h1', 'Jogo do número secreto!');
exibirTextoNaTela('p', 'Digite um número entre 0 e 10');

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function verificarChute() {
    let chute = document.querySelector('input').value;

    tentativas++;

    if (chute == numeroSecreto) {
        let palavra = tentativas == 1 ? "tentativa" : "tentativas";
        let mensagemTentativas = `Você acertou o número secreto em ${tentativas} ${palavra}!`;
        exibirTextoNaTela('p', 'Parabéns! ' + mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute > numeroSecreto) {
        exibirTextoNaTela('p', 'O número secreto é menor do que ' + chute);
    } else {
        exibirTextoNaTela('p', 'O número secreto é maior do que ' + chute);
    }
    limparCampo();
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numLimite);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 0;
    exibirTextoNaTela('p', 'Digite um número entre 0 e 10');
    document.getElementById('reiniciar').setAttribute('disabled', true);
}