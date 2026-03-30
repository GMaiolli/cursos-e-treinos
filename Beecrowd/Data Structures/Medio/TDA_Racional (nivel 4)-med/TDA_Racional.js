input = `4
1 / 2 + 3 / 4
1 / 2 - 3 / 4
2 / 3 * 6 / 6
1 / 2 / 3 / 4
`

var lines = input.split('\n');

const N = lines[0];

function mdc(a, b) {
    let r;
    while(b !== 0) {
        r = a % b;
        a = b;
        b = r;
    }
    return a;
}

let resuls = [];

for (let i = 1; i <= N; i++) {
    let str = lines[i];

    const tokens = str.trim().split(/\s+/);

    const n1 = parseInt(tokens[0]);
    const d1 = parseInt(tokens[2]);
    const operador = tokens[3];
    const n2 = parseInt(tokens[4]);
    const d2 = parseInt(tokens[6]);

    let n3, d3;

    switch (operador) {
        case '+':
            n3 = (n1*d2) + (n2*d1);
            d3 = (d1*d2);
            break;
        case '-':
            n3 = (n1*d2) - (n2*d1);
            d3 = (d1*d2);
            break;
        case '*':
            n3 = (n1*n2);
            d3 = (d1*d2);

            break;
        case '/':
            n3 = n1 * d2;
            d3 = d1 * n2;

            break;
    }

    let mdc1 = Math.abs(mdc(n3, d3));
    let n4 = n3 / mdc1;
    let d4 = d3 / mdc1;
    resuls.push(`${n3}/${d3} = ${n4}/${d4}`);
}

console.log(resuls.join("\n"))