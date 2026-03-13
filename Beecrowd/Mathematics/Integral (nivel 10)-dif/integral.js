var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

let lineIdx = 0;

while (lineIdx < lines.length) {
    let firstLine = lines[lineIdx++];
    if (!firstLine || firstLine.trim() === "") break;

    let [N, M, Y] = firstLine.split(/\s+/).map(Number);
    let pontosS = [];

    for (let i = 0; i < M; i++) {
        let [x, f] = lines[lineIdx++].split(/\s+/).map(Number);
        pontosS.push({ x, f });
    }

    pontosS.sort((a, b) => a.x - b.x);

    let f_min = new Array(N + 1);
    let f_max = new Array(N + 1);

    for (let i = 0; i < pontosS.length - 1; i++) {
        let pA = pontosS[i];
        let pB = pontosS[i + 1];
        
        f_min[pA.x] = pA.f;
        f_max[pA.x] = pA.f;
        f_min[pB.x] = pB.f;
        f_max[pB.x] = pB.f;

        let menor = Math.min(pA.f, pB.f);
        let maior = Math.max(pA.f, pB.f);

        for (let j = pA.x + 1; j < pB.x; j++) {
            f_min[j] = menor;
            f_max[j] = maior;
        }
    }

    let somaMin2Y = BigInt(f_min[0]) + BigInt(f_min[N]);
    let somaMax2Y = BigInt(f_max[0]) + BigInt(f_max[N]);
    for (let i = 1; i < N; i++) {
        somaMin2Y += 2n * BigInt(f_min[i]);
        somaMax2Y += 2n * BigInt(f_max[i]);
    }

    let alvo2Y = BigInt(Y) * 2n;

    if (alvo2Y < somaMin2Y || alvo2Y > somaMax2Y || (alvo2Y - somaMin2Y) % 2n !== 0n) {
        console.log("N");
    } else {
        let falta = (alvo2Y - somaMin2Y) / 2n;
        let f_res = [...f_min];

        for (let i = N - 1; i >= 1; i--) {
            let diffMax = BigInt(f_max[i] - f_res[i]);
            let ajuste = falta < diffMax ? falta : diffMax;
            f_res[i] += Number(ajuste);
            falta -= ajuste;
            if (falta === 0n) break;
        }

        if (falta === 0n) {
            let out = "S";
            let sIdx = 0;
            let sX = pontosS.map(p => p.x);
            for (let i = 0; i <= N; i++) {
                if (!sX.includes(i)) {
                    out += " " + f_res[i];
                }
            }
            console.log(out);
        } else {
            console.log("N");
        }
    }
}