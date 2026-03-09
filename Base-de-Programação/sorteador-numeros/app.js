function sortear(){
    let numerosSorteados = [];
    let quantidade = document.getElementById("quantidade").value;
    let de = document.getElementById("de").value;
    let ate = document.getElementById("ate").value;

    while(numerosSorteados.length < quantidade){
        let numeroSorteado = parseInt(Math.random() * (ate - de + 1) + parseInt(de));
        if(!numerosSorteados.includes(numeroSorteado)){
            numerosSorteados.push(numeroSorteado);
        }
    }
    exibirNumerosSorteados(numerosSorteados);
}

function exibirNumerosSorteados(numerosSorteados){
    let texto = "Números sorteados: " + numerosSorteados.join(", ");
    document.getElementById("resultado").innerText = texto;
}