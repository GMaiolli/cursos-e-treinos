var input = `2
1 -3
6
40 0 -41 0 41 42
4
300 450 449 450
0
`

var lines = input.trim().split('\n').map(line => line.split(' ').filter(Boolean).map(Number));

for (let i = 0; i < lines.length; i++) {
    let N = lines[i][0];
    if (N === 0) break;

    i++;

    let mag = [];
    for(let j = 0; j < N; j++) {
        mag.push(lines[i][j]);
    }

    let count = 0;
    for (let e = 0; e < N; e++) {
        let atual = mag[e];

        let ant = mag[(e - 1 + N) % N];
        let prox = mag[(e + 1) % N];

        if ((atual > ant && atual > prox) || (atual < ant && atual < prox)) {
            count++;
        }
    }
    console.log(count);
}