var input = `240 48
`

var lines = input.trim().split('\n').map(line => line.split(' ').filter(Boolean).map(Number));

let casaAdjacente = false;

const D = lines[0][0];
const E = lines[0][1];

let a = D;
let b = E;
let x0 = 1, x1 = 0;
let y0 = 0, y1 = 1;

while (b !== 0) {
    let q = Math.floor(a / b);
    let r = a % b;
    a = b;
    b = r;

    let tempX = x1;
    x1 = x0 - q * x1;
    x0 = tempX;

    let tempY = y1;
    y1 = y0 - q * y1;
    y0 = tempY;
}

let x_ajustado = (x0 % E + E) % E;
let y_ajustado = (1 - D * x_ajustado) / E;
let x_ajustado_neg = ((-x0) % E + E) % E;
let y_ajustado_neg = (-1 - D * x_ajustado_neg) / E;

let adj1 = Math.abs(x_ajustado) + Math.abs(y_ajustado);
let adjneg1 = Math.abs(x_ajustado_neg) + Math.abs(y_ajustado_neg);

if (a !== 1) {
    console.log("IMPOSSIVEL");
} else {
    console.log(adj1 >= adjneg1 ? adjneg1 : adj1)
}