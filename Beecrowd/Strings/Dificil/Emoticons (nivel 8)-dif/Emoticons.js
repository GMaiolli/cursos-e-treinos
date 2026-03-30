var input = `4 6
:-)
:-(
(-:
)-:
Hello uncle John! :-) :-D
I am sad or happy? (-:-(?
I feel so happy, my head spins
(-:-)(-:-)(-:-)(-:-) :-) (-: :-)
but then sadness comes :-(
Loves you, Joanna :-)))))
3 1
:)
):
))
:):)):)):)):(:((:(((:):)
0 0
`

var lines = input.split('\n');

let linhaAtual = 0;

function NeM(linha) {
    const parts = linha.trim().split(/\s+/);
    const N = parseInt(parts[0])
    const M = parseInt(parts[1])
    return [N, M];
}

function ban(N) {
    let banEmote = [];
    for (let i = 0; i < N; i++){
        banEmote.push(lines[linhaAtual++]);
    }
    return banEmote;
}

function limpar (M, banEmotes) {
    let totalMudancas = 0;

    for (let j = 0; j < M; j++) {
        let fraseAtual = lines[linhaAtual++];
        if (fraseAtual === undefined) continue;

        let marcados = new Array(fraseAtual.length).fill(false);

        for (let i = 0; i < fraseAtual.length; i++) {
            for (let emote of banEmotes) {
                let len = emote.length;
                if (i >= len - 1) {
                    let sub = fraseAtual.substring(i - len + 1, i + 1);

                    if (sub === emote) {
                        let jaQuebrado = false;
                        for (let k = i - len + 1; k <= i; k++) {
                            if (marcados[k]) jaQuebrado = true;
                        }
                        if (!jaQuebrado) {
                            marcados[i] = true;
                            totalMudancas++;
                        }
                    }
                }
            }
        }
    }
    console.log(totalMudancas);
}

while (linhaAtual < lines.length) {
    let linha = lines[linhaAtual++];
    if (!linha || linha.trim() === "") continue;

    let [N, M] = NeM(linha);

    if (N === 0 && M === 0) break;

    let emoticons = ban(N);

    limpar(M, emoticons);
}