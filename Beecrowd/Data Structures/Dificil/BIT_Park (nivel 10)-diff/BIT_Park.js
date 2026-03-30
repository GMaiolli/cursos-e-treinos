var input = `6 4
0 700000 0
1500000 2000000 2000000
I B1
M A2 2000000
P A2
G B
6 4
0 700000 0
1500000 2000000 2000000
I B1
M A2 1999999
P A2
G B
6 5
0 700000 0
1500000 2000000 2000000
I B1
M A2 1999999
P A2
P B2
G B
6 5
0 700000 0
1500000 2000000 2000000
I B1
M A2 1999999
P A2
P B2
G A
0 0
`

const data = input;
let ptr = 0;
const n = data.length;

const MAX_POS = 2000000;
const bitA = new Int32Array(MAX_POS + 2);
const bitB = new Int32Array(MAX_POS + 2);

function update(bit, idx, val) {
    for (idx++; idx < bit.length; idx += idx & -idx) {
        bit[idx] += val;
    }
}

function query(bit, idx) {
    let sum = 0;
    for (idx++; idx > 0; idx -= idx & -idx) {
        sum += bit[idx];
    }
    return sum;
}

function nextToken() {
    while (ptr < n && data.charCodeAt(ptr) <= 32) ptr++;
    if (ptr >= n) return undefined;
    const start = ptr;
    while (ptr < n && data.charCodeAt(ptr) > 32) ptr++;
    return data.slice(start, ptr);
}

while (true) {
    const nTok = nextToken();
    const eTok = nextToken();
    if (nTok === undefined || eTok === undefined) break;

    const N = Number(nTok);
    const E = Number(eTok);
    if (N === 0 && E === 0) break;

    let placarA = 0, placarB = 0;
    let proximoGolAnulado = false;
    const half = N / 2;
    const limiteImpedimento = 2 * (N / 2);

    bitA.fill(0);
    bitB.fill(0);

    const posA = new Int32Array(half + 1);
    const posB = new Int32Array(half + 1);

    for (let i = 0; i < half; i++) {
        const pA = Number(nextToken());
        posA[i + 1] = pA;
        update(bitA, pA, 1);
    }

    for (let i = 0; i < half; i++) {
        const pB = Number(nextToken());
        posB[i + 1] = pB;
        update(bitB, pB, 1);
    }
    
    for (let i = 0; i < E; i++) {
        const event = nextToken();
        if (event === undefined) break;

        switch (event) {
            case 'I': {
                const nome = nextToken();
                const time = nome[0];
                const idx = Number(nome.slice(1));

                proximoGolAnulado = false;

                const pos = (time === 'A') ? posA[idx] : posB[idx];
                let adversariosNaFrente = 0;

                if (time === 'A') {
                    adversariosNaFrente = half - query(bitB, pos);
                } else {
                    adversariosNaFrente = query(bitA, pos - 1);
                }

                if (adversariosNaFrente * 11 < N) {
                    proximoGolAnulado = true;
                }
                break;
            }
            case 'M':{
                const nome = nextToken();
                const time = nome[0];
                const idx = Number(nome.slice(1));
                const novaPos = Number(nextToken());

                const antigaPos = (time === 'A') ? posA[idx] : posB[idx];
                const bitAlvo = (time === 'A') ? bitA : bitB;
    
                update(bitAlvo, antigaPos, -1);
                update(bitAlvo, novaPos, 1);  

                if (time === 'A') posA[idx] = novaPos;
                else posB[idx] = novaPos;
                break;
            }
            case 'P':{
                const nome = nextToken();
                const time = nome[0];
                const idx = Number(nome.slice(1));

                const pos = (time === 'A') ? posA[idx] : posB[idx];
                let adversariosNaFrente = 0;

                if (time === 'A') {
                    adversariosNaFrente = half - query(bitB, pos);
                } else {
                    adversariosNaFrente = query(bitA, pos - 1);
                }
    
                if (adversariosNaFrente * 11 < limiteImpedimento) {
                    proximoGolAnulado = true;
                }
                break;
            }
            case 'G':
                const timeGol = nextToken();
                if (!proximoGolAnulado) {
                    if (timeGol === 'A') placarB++;
                    else placarA++;
                }
                proximoGolAnulado = false;
                break;
            case 'S': proximoGolAnulado = false; break;
        }
    }
    
    console.log(placarA + " X " + placarB);
}