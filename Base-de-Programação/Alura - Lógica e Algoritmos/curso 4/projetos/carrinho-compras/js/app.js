let listaProdutos = [];

function addProduto(produto, quantidade) {
    let nome, preco;

    if (produto.includes("Celular")) {
        nome = "Celular";
        preco = 1400;
    } else if (produto.includes("Fone")) {
        nome = "Fone";
        preco = 100;
    } else if (produto.includes("Oculos")) {
        nome = "Oculos";
        preco = 5000;
    }

    for (let i = 0; i < quantidade; i++) {
        listaProdutos.push({ nome: nome, preco: preco });
    }

    exibirCarrinho();
}

function removerProduto(produto) {
    let index = listaProdutos.findIndex(p => p.nome === produto);
    if (index !== -1) {
        listaProdutos.splice(index, 1);
        exibirCarrinho();
    }
}

function precoTotal() {
    return document.getElementsByClassName("carrinho__total")[0].innerText = `Total: R$${listaProdutos.reduce((total, p) => total + p.preco, 0)}`;
}

function adicionar() {
    let produto = document.getElementById("produto").value;
    let quantidade = parseInt(document.getElementById("quantidade").value);

    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, insira uma quantidade válida.");
        return;
    }

    addProduto(produto, quantidade);

    document.getElementById("quantidade").value = "";
}
function exibirCarrinho() {
    let carrinho = document.getElementById("lista-produtos");

    carrinho.innerHTML = "";

    let totalFone = listaProdutos.filter(p => p.nome === "Fone").length;
    let totalCel = listaProdutos.filter(p => p.nome === "Celular").length;
    let totalVR = listaProdutos.filter(p => p.nome === "Oculos").length;

    if (totalFone > 0) {
        carrinho.innerHTML += `<section class="carrinho__produtos__produto">
        <button onclick="removerProduto('Fone')" class="botao-menos"> - </button>
        <span class="texto-azul">${totalFone}x</span>
        <button onclick="addProduto('Fone', 1)" class="botao-mais"> + </button>
         Fone de Ouvido <span class="texto-azul">R$100 </span> </section>`;
    }
    if (totalCel > 0) {
        carrinho.innerHTML += `<section class="carrinho__produtos__produto">
        <button onclick="removerProduto('Celular')" class="botao-menos"> - </button>
        <span class="texto-azul">${totalCel}x</span>
        <button onclick="addProduto('Celular', 1)" class="botao-mais"> + </button>
         Celular <span class="texto-azul">R$1400 </span> </section>`;
    }
    if (totalVR > 0) {
        carrinho.innerHTML += `<section class="carrinho__produtos__produto">
        <button onclick="removerProduto('Oculos')" class="botao-menos"> - </button>
        <span class="texto-azul">${totalVR}x</span>
        <button onclick="addProduto('Oculos', 1)" class="botao-mais"> + </button>
         Óculos de Realidade Virtual <span class="texto-azul">R$5000 </span> </section>`;
    }

    precoTotal();
}

function limpar() {
    listaProdutos = [];
    exibirCarrinho();
}