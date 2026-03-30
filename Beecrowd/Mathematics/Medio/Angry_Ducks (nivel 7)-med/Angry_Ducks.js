var fs = require('fs');
var input = fs.readFileSync(0, 'utf8');
var lines = input.split(/\s+/);

let i = 0;
const g = 9.80665;
const pi = 3.14159;

while (i < lines.length) {
    if (lines[i] === "") {
        i++;
        continue;
    }

    // leitura inicial do cenário
    const h = parseFloat(lines[i++]);
    if (isNaN(h)) break;

    const p1 = parseInt(lines[i++]);
    const p2 = parseInt(lines[i++]);
    const n = parseInt(lines[i++]);

    const p_min = Math.min(p1, p2);
    const p_max = Math.max(p1, p2);

    // processa cada tentativa do n
    for (let j = 0; j < n; j++) {
        const alpha = parseFloat(lines[i++]);
        const v = parseFloat(lines[i++]);

        const rad = alpha * (pi / 180);
        const vs = v * Math.sin(rad);
        const vc = v * Math.cos(rad);

        // formula do alcance com h inicial
        const x = (vc / g) * (vs + Math.sqrt(vs ** 2 + 2 * g * h));
        
        const res = (x >= p_min && x <= p_max) ? "DUCK" : "NUCK";
        
        process.stdout.write(`${x.toFixed(5)} -> ${res}\n`);
    }
}