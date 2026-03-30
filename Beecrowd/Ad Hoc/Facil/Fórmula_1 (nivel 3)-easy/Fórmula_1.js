var input = `1 3
3 2 1
3
3 5 3 2
3 5 3 1
3 1 1 1
3 10
1 2 3 4 5 6 7 8 9 10
10 1 2 3 4 5 6 7 8 9
9 10 1 2 3 4 5 6 7 8
2
5 5 4 3 2 1
3 10 5 1
2 4
1 3 4 2
4 1 3 2
2
3 3 2 1
3 5 4 2
0 0
`

var lines = input.trim().split('\n').map(line => line.split(' ').filter(Boolean).map(Number));

for (let i = 0; i < lines.length; i++) {
    let [G, P] = lines[i];
    if (G === 0 && P === 0) break;

    let corridas = [];
    for(let j = 0; j < G; j++) {
        i++;
        corridas.push(lines[i]);
    }

    i++;
    let S = lines[i][0];

    for (let e = 0; e < S; e++) {
        i++;
        let sistema = lines[i].slice(1);
        let placar = new Array(P).fill(0);
        corridas.forEach(resultadoCorrida => {
            resultadoCorrida.forEach((posicaoChegada, indexPiloto) => {
                let pontosGanhos = sistema[posicaoChegada - 1] || 0;
                placar[indexPiloto] += pontosGanhos;
            });
        });
        let maxPontos = Math.max(...placar);
        let vencedores = [];
        placar.forEach((p, idx) => {
            if (p === maxPontos) vencedores.push(idx + 1); // +1 porque pilotos começam em 1
        });
        console.log(vencedores.join(' '));
    }
}