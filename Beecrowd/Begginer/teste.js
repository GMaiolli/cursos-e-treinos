let caminho = [
  [1, 0, 1], 
  [1, 0, 1], 
  [0, 1, 0], 
  [1, 1, 0],
  [1, 0, 1],
  [0, 1, 1]  
];

let colunaAtual = 1; 
let caminhofeito = [colunaAtual];

function caminhocerto() {
    for (let j = 1; j < caminho.length; j++) {
        let proximaLinha = caminho[j + 1]

        if (caminho[j][colunaAtual] === 0) {
            caminhofeito.push(colunaAtual);
        } 
        else if (colunaAtual > 0 && caminho[j][colunaAtual - 1] === 0){
            if (!proximaLinha || proximaLinha[colunaAtual - 1] === 0 || (colunaAtual > 1 && proximaLinha[colunaAtual - 2] === 0)) {
                colunaAtual--;
                caminhofeito.push(colunaAtual);
            }
        }
        else if (colunaAtual < caminho[j].length - 1 && caminho[j][colunaAtual + 1] === 0 ) {
            if (!proximaLinha || proximaLinha[colunaAtual + 1] === 0 || (colunaAtual < caminho[j].length - 2 && proximaLinha[colunaAtual + 2] === 0)) {
                colunaAtual++;
                caminhofeito.push(colunaAtual);
            }
        }
    }
}
caminhocerto();
console.log(caminhofeito)
let toque = 0;

function calculartoque() {
    for (let i = 0; i < caminhofeito.length - 1; i++){
        caminhofeito[i] != caminhofeito[i+1] ? toque++ : null;
    }
}
calculartoque();
console.log(toque)