var input = `10 20
7 2 9 4 0 1 8 5 3 6 2 9 0 4 7 1 8 3 5 6
1 0 8 5 3 7 2 9 4 6 0 1 8 2 5 3 7 9 4 0
4 6 2 9 0 7 1 8 3 5 6 2 0 4 9 7 1 8 3 5
8 3 5 1 0 7 2 9 4 6 8 3 5 1 0 7 2 9 4 6
0 7 1 8 3 5 6 2 9 0 0 7 1 8 3 5 6 2 9 4
5 3 7 2 9 4 0 1 8 6 5 3 7 2 9 4 0 1 8 6
2 9 0 4 7 1 8 3 5 6 2 9 0 4 7 1 8 3 5 6
6 4 1 0 8 0 3 7 2 9 6 4 1 0 8 5 3 7 2 9
3 5 6 2 9 0 4 7 0 8 3 5 6 0 9 0 4 7 1 8
9 1 0 7 2 9 4 6 8 3 9 1 0 7 2 9 4 6 8 3
3
2
10
7
`

var lines = input.trim().split('\n').map(line => line.split(' ').filter(Boolean));

const N = parseInt(lines[0][0]);
const M = parseInt(lines[0][1]);

const quadrado = []


for (k = 1; k < N + 1; k++) {
    let arrayTempQuadd = [];
    for (e = 0; e < M; e++) {
        arrayTempQuadd.push(parseInt(lines[k][e]));
    }
    quadrado.push(arrayTempQuadd);
}

const pref = Array.from({ length: N + 1 }, () => new Array(M + 1).fill(0));

for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
        let val = (quadrado[i-1][j-1] === 0) ? 1 : 0;
        pref[i][j] = val + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1];
    }
}
const QuantidadeNQ = parseInt(lines[N + 1]);
const loop = N + 2;
for (let z = loop; z < (QuantidadeNQ + loop); z++) {
    let NQ = parseInt(lines[z]);

    let found = false;

    if (NQ > N || NQ > M) {
        console.log("no");
        continue;
    }

    for (let r = 1; r <= N - NQ + 1 && !found; r++) {
        for (let c = 1; c <= M - NQ + 1 && !found; c++) {
            let r2 = r + NQ - 1;
            let c2 = c + NQ - 1;
            let totalZeros = pref[r2][c2] - pref[r-1][c2] - pref[r2][c-1] + pref[r-1][c-1];
            if (totalZeros === 0) {
                found = true;
            }
        } 
    }
    console.log(found ? "yes" : "no");
}