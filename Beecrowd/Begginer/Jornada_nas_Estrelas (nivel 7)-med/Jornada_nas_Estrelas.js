var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

var N = parseInt(lines[0]);
var X = lines[1].trim().split(' ').map(Number);

let totalCarneiros = 0n;
for (let j = 0; j < N; j++) totalCarneiros += BigInt(X[j]);

let i = 0;
let maxEstrela = 0;
let roubados = 0n;
let estrelasAtacadas = new Uint8Array(N); 

while (i >= 0 && i < N) {
    if (estrelasAtacadas[i] === 0) {
        estrelasAtacadas[i] = 1;
        maxEstrela++; 
    }

    let carneiroAntes = X[i];

    if (X[i] > 0) {
        X[i]--;
        roubados++;
    }

    if (carneiroAntes % 2 !== 0) {
        i++; 
    } else {
        i--; 
    }
}

console.log(maxEstrela + " " + (totalCarneiros - roubados).toString());