let listaNomes = [];

function adicionar() {
    let nome = document.getElementById("nome-amigo");

    if (nome.value === "") {
        alert("Por favor, insira um nome.");
        return;
    }

    if (listaNomes.includes(nome.value)) {
        alert("Esse nome já foi adicionado, caso sejá pessoas diferentes, diferenciar com algo a mais no nome!");
        return;
    }

    listaNomes.push(nome.value);
    nome.value = "";
    nome.focus();
    atualizarLista();
}

function atualizarLista() {
    let listaElement = document.getElementById("lista-amigos");
    listaElement.innerHTML = "";
    listaElement.innerHTML += listaNomes.join(", ");
}

function sortear() {
    if (listaNomes.length < 2) {
        alert("Adicione pelo menos dois amigos para sortear.");
        return;
    }
    let sorteio = [...listaNomes].sort(() => Math.random() - 0.5);

    let resultado = [];

    for (let i = 0; i < sorteio.length; i++) {
        let amigo = sorteio[i];
        let amigoSorteado = sorteio[(i + 1) % sorteio.length];
        resultado.push(`${amigo} -> ${amigoSorteado}`);
    }

    document.getElementById("lista-sorteio").innerHTML = resultado.join("<br>");
}

function reiniciar () {
    listaNomes = [];
    document.getElementById("lista-amigos").innerHTML = "";
    document.getElementById("lista-sorteio").innerHTML = "";
}