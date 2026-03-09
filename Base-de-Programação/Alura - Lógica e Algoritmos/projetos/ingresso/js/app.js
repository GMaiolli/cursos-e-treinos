function comprar() {
    let tipoIngresso = document.getElementById("tipo-ingresso").value;
    let quantidade = parseInt(document.getElementById("qtd").value);

    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, insira uma quantidade válida.");
        return;
    }

    switch (tipoIngresso) {
        case "pista":
            comprarPista(quantidade);
            break;

        case "superior":
            comprarSuperior(quantidade);
            break;
        case "inferior":
            comprarInferior(quantidade);
            break;
        default:
            alert("Tipo de ingresso inválido.");
    
    }
}

function comprarPista(quantidade) {
    let pista = parseInt(document.getElementById("qtd-pista").textContent);
    if (quantidade > pista) {
        alert("Quantidade de ingressos para pista insuficiente.");
        return;
    }
    let novoValorPista = pista - quantidade;
    document.getElementById("qtd-pista").textContent = novoValorPista;
}

function comprarSuperior(quantidade) {
    let superior = parseInt(document.getElementById("qtd-superior").textContent);
    if (quantidade > superior) {
        alert("Quantidade de ingressos para superior insuficiente.");
        return;
    }
    let novoValorSuperior = superior - quantidade;
    document.getElementById("qtd-superior").textContent = novoValorSuperior;
}

function comprarInferior(quantidade) {
    let inferior = parseInt(document.getElementById("qtd-inferior").textContent);
    if (quantidade > inferior) {
        alert("Quantidade de ingressos para inferior insuficiente.");
        return;
    }
    let novoValorInferior = inferior - quantidade;
    document.getElementById("qtd-inferior").textContent = novoValorInferior;
}