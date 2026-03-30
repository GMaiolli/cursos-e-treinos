// var input = require('fs').readFileSync('/dev/stdin', 'utf8');
// var lines = input.split('\n');

// var [Hi, Mi, Hf, Mf] = lines.shift().split(' ').map(Number)

Hi = 20
Mi = 20
Hf = 2
Mf = 10

if (Hi === Hf && Mi === Mf) {
    var H = 24
    var M = 0
} else if (Mi > Mf) {
        var H = Hf - Hi - 1
        var M = 60 - Mi + Mf
    } else {
        var H = Hf - Hi
        var M = Mf - Mi
}
if (H < 0) {
    H = H + 24
}
if (M < 0 && H < 0) {
    throw new Error('jogo tem q durar mais que 1 min')
} else {
    console.log(`O JOGO DUROU ${H} HORA(S) E ${M} MINUTO(S)`)
}