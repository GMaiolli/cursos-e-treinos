// var input = require('fs').readFileSync('/dev/stdin', 'utf8');
// var lines = input.split('\n');

const casos = [4];

var lines = [3, 4, 5, 9];

const fib = [0n, 1n];
for (let i = 2; i <= 60; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
}

for (let i = 0; i < casos; i++) {
    const n = parseInt(lines[i]);

    if (!isNaN(n)) {
        console.log(`Fib(${n}) = ${fib[n].toString()}`);
    }
}