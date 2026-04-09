var input = require('fs').readFileSync('/dev/stdin', 'utf8').trim();

if (input.length === 0) {
    process.exit(0);
}

var lines = input.split(/\r?\n/);
var pisanoCache = Object.create(null);

function getPisanoPeriod(m) {
    if (m <= 1) return 1;
    if (pisanoCache[m] !== undefined) return pisanoCache[m];

    var a = 0;
    var b = 1;
    var limit = 6 * m;

    for (var i = 0; i < limit; i++) {
        var c = (a + b) % m;
        a = b;
        b = c;

        if (a === 0 && b === 1) {
            pisanoCache[m] = i + 1;
            return i + 1;
        }
    }

    return 1;
}

function multiply2x2(A, B, mod) {
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

function fibMod(n, mod) {
    if (mod === 1n) return 0n;
    if (n === 0n) return 0n;
    if (n === 1n) return 1n % mod;

    var result = [[1n, 0n], [0n, 1n]];
    var base = [[1n, 1n], [1n, 0n]];
    var exp = n;

    while (exp > 0n) {
        if ((exp & 1n) === 1n) {
            result = multiply2x2(result, base, mod);
        }
        base = multiply2x2(base, base, mod);
        exp >>= 1n;
    }

    return result[0][1];
}

var out = [];

for (var i = 0; i < lines.length; i++) {
    var trimmed = lines[i].trim();
    if (trimmed.length === 0) continue;

    var parts = trimmed.split(/\s+/);
    if (parts.length < 2) continue;

    var N = BigInt(parts[0]);
    var M = Number(parts[1]);

    if (!Number.isInteger(M) || M <= 0) {
        out.push('0');
        continue;
    }

    var P = getPisanoPeriod(M);
    var K = fibMod(N, BigInt(P));
    var answer = fibMod(K, BigInt(M));

    out.push(answer.toString());
}

process.stdout.write(out.join('\n'));
