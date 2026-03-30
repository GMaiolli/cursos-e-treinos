var input = `3 2
1 a
3 a b c
1 c
1 a
2 b c
5 2
2 s1 s2
2 s3 s4
2 s5 s6
2 s7 s8
2 s1 s2
3 s1 s2 s20
3 s1 s2 s21
0 0
`

var lines = input.trim().split('\n').map(line => line.split(' ').filter(Boolean));

while(lines.length > 0){
    let linhaAtual = lines.shift();
    const N = parseInt(linhaAtual[0]);
    const M = parseInt(linhaAtual[1]);

    if (N === 0 & M === 0) break;

    let server = [];
    let client = [];

    for (let i = 0; i < N; i++) {
        let linhaAtiva = lines.shift()
        let Q = parseInt(linhaAtiva[0]);

        let apps = linhaAtiva.slice(1, Q + 1);

        server.push(new Set(apps));
    }

    for (let j = 0; j < M; j++) {
        let linhaAtiva = lines.shift()
        let P = parseInt(linhaAtiva[0]);

        let apps = linhaAtiva.slice(1, P + 1);

        client.push(apps);
    }

    let totalConexoes = 0;

    for (let s = 0; s < server.length; s++) {
        for (let c = 0; c < client.length; c++){
            const conectou = client[c].some(app => server[s].has(app));
            if (conectou) totalConexoes++;
        }
    }

    console.log(totalConexoes);
}