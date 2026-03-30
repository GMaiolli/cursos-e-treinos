var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

const N = lines.length;

const MOD = 1e9 + 7;

for (let i = 0; i < N; i++) {
    let linha = lines[i].trim()
    if (linha === "") continue;

    //em vez de ter q fazer um loop pra achar valor decimal de cada letra, fazer - 65 (valor de A)
    //e ai fazer loop que usa J = tamanho da array e J-- pra fazer a potencia -> (valor + 26^j) e ir somando isso
    //usei o algoritmo de horner, que resumidamente transforma aqueli em -> (acumulador * 26) + valordaletra

    let resul = lines[i].split('')
        .map(char => char.charCodeAt(0) - 65)
        .reduce((acc, valor) => (acc * 26 + valor) % MOD, 0);

    console.log(resul);
}