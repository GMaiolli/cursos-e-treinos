var input = `3
5 2
6 3
1234 233
`

var lines = input.trim().split('\n').map(line => line.split(' ').filter(Boolean).map(Number));

let a = lines[0]

for (let i = 1; i <= a; i++) {
    let [N, P] = lines[i]

    let resul = 0;

    for (let j = 2; j <= N; j++) {
        resul = (resul + P) % j;
    }

    console.log("Case " + i + ": " + (resul + 1));
}