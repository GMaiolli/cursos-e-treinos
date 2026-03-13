var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');
const n = parseInt(lines[0]);


const matriz = Array.from({ length: n }, () => Array(n).fill(null));

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if ((i + j) % 2 === 0) {
      matriz[i][j] = 0;
    } else {
      matriz[i][j] = 1;
    }
  }
}

const branco = matriz.flat().filter(value => value === 0).length;
const preto = matriz.flat().filter(value => value === 1).length;

console.log(`${branco} casas brancas e ${preto} casas pretas`);