var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

if (lines.length < 3) process.exit();

var [n, x] = lines[0].split(' ').map(Number);
var sequencia = lines[1].trim();
var [p, m, g] = lines[2].split(' ').map(Number);

const tamanhos = { 'P': p, 'M': m, 'G': g };

let indices = { 'P': 0, 'M': 0, 'G': 0 };

let muralhas = [x];

for (let i = 0; i < n; i++) {
    let tita = sequencia[i];
    let dano = tamanhos[tita];
    let conseguiu = false;

    for (let j = indices[tita]; j < muralhas.length; j++) {
        if (muralhas[j] >= dano) {
            muralhas[j] -= dano;
            if (muralhas[j] < dano) {
                indices[tita] = j + 1;
            }
            conseguiu = true;
            break;
        }
    }

    if (!conseguiu) {
        muralhas.push(x - dano);
        if (x - dano < dano) {
            indices[tita] = muralhas.length;
        } else {
            indices[tita] = muralhas.length - 1;
        }
    }
}

console.log(muralhas.length);