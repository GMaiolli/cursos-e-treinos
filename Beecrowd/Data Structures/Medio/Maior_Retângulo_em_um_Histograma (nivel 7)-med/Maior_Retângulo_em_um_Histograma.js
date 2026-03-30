var input = `7 2 1 4 5 4 3 3
4 1000 1000 1000 1000
0
`

var lines = input.trim().split('\n').map(line => line.split(' ').filter(Boolean));

for (let j = 0; j < lines.length; j++){
    let histo = lines[j];
    let N = parseInt(histo.shift());
    if (N === 0) break;
    histo = histo.map(Number);

    let pilha = [];

    let areaMax = 0;

    for (let i = 0; i <= N; i++) {
        let hAt = i < histo.length ? histo[i] : 0;
        while (pilha.length > 0 && histo[pilha[pilha.length - 1]] >= hAt) {
            let indiceQueSaiu = pilha.pop();
            let h = histo[indiceQueSaiu];
            let l = pilha.length === 0 ? i : i - pilha[pilha.length - 1] - 1;
            let areaAt = h * l;
            areaMax = areaMax < areaAt ? areaAt : areaMax;
        }
        pilha.push(i);
    }

    console.log(areaMax)
}