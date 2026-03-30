var input = `10
4
32
34
543
3456
654
567
87
6789
98
`

var lines = input.trim().split('\n').map(Number);

const N = lines[0];

let pares = [];
let impares = [];

for (let i = 1; i <= N; i++) {
    let num = lines[i];
    if (num === undefined) continue;
    (num % 2 === 0 ? pares : impares).push(num)
}

pares.sort((a, b) => a - b);
impares.sort((a, b) => b - a);

console.log([...pares, ...impares].join('\n'));