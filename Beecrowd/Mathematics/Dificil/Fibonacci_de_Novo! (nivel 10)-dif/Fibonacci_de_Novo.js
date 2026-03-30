var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

const pisanoCache = {};

function getPisanoPeriod(m) {
    if (pisanoCache[m]) return pisanoCache[m];
    
    let a = 0, b = 1, c;
    let limit = 6 * m; 
    for (let i = 0; i < limit; i++) {
        c = (a + b) % m;
        a = b;
        b = c;
        if (a === 0 && b === 1) {
            pisanoCache[m] = i + 1;
            return i + 1;
        }
    }
    return 1;
}

function multiply(A, B, mod) {
    return [
        [
            (A[0][0] * B[0][0] + A[0][1] * B[1][0]) % mod,
            (A[0][0] * B[0][1] + A[0][1] * B[1][1]) % mod
        ],
        [
            (A[1][0] * B[0][0] + A[1][1] * B[1][0]) % mod,
            (A[1][0] * B[0][1] + A[1][1] * B[1][1]) % mod
        ]
    ];
}

function fastFib(n, m) {
    if (n === 0n) return 0n;
    if (n === 1n) return 1n;

    let mod = BigInt(m);
    let res = [[1n, 0n], [0n, 1n]]; 
    let base = [[1n, 1n], [1n, 0n]];
    
    let tempN = n;
    while (tempN > 0n) {
        if (tempN % 2n === 1n) res = multiply(res, base, mod);
        base = multiply(base, base, mod);
        tempN = tempN / 2n;
    }
    return res[0][1];
}

for (let line of lines) {
    let trimmed = line.trim();
    if (trimmed === "") continue;
    
    let parts = trimmed.split(/\s+/);
    if (parts.length < 2) continue;

    let N = BigInt(parts[0]);
    let M = parseInt(parts[1]);

    let P = getPisanoPeriod(M);
    
    let K = fastFib(N, P);
    
    let finalRes = fastFib(K, M);

    process.stdout.write(finalRes.toString() + '\n');
}