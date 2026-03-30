var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

for (let i = 0; i < lines.length; i++) {
    let N = parseInt(lines[i]);

    if (N === 0 || isNaN(N)) break;

    let numQuad = (N * (N + 1) * (2 * N + 1)) / 6;

    console.log(numQuad);
}