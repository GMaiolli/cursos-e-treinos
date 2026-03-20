var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

const N = lines[0].trim();
const palavras = [];

for (let i = 1; i <= N; i++) {
    if (lines[i]) {
        palavras.push(lines[i].trim());
    }
}

const listaLimpa = [...new Set(palavras)];

const faltaPokedex = 151 - listaLimpa.length;

console.log(`Falta(m) ${faltaPokedex} pomekon(s).`);