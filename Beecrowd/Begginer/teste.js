let caminho = [
  [1, 0, 1], 
  [1, 0, 1], 
  [0, 1, 0], 
  [1, 1, 0],
  [1, 0, 1],
  [0, 1, 1],
  [1, 0, 1]  
];

let resultado = [];

function encontrarCaminho() {

    function resolver(linha, coluna, trajeto) {
        if (linha === caminho.length) {
            resultado = [...trajeto];
            return true;
        }

        if (coluna < 0 || coluna >= caminho[0].length || caminho[linha][coluna] === 1) {
            return false;
        }

        trajeto.push(coluna);

        if (resolver(linha + 1, coluna, trajeto) || 
            resolver(linha + 1, coluna - 1, trajeto) || 
            resolver(linha + 1, coluna + 1, trajeto)) {
            return true;
        }

        trajeto.pop();
        return false;
    }

    if (resolver(0, 1, [])) {
    } else {
        return "Sem caminho possível";
    }
}

let toque = 0;

function calculartoque() {
    for (let i = 0; i < resultado.length - 1; i++){
        resultado[i] != resultado[i+1] ? toque++ : null;
    }
}
calculartoque();
console.log(toque)