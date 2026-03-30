var input = `16 4
D G A B C D G G G C D E F# G C C
G G C D
12 2
C C# D D# E F F# G G# A A# B
C D
12 2
C Db D Eb E F Gb G Ab A Bb B
C D
4 3
C E G Bb
D F# A
0 0
`

var lines = input.split(/\r?\n/);

const mapa = { 'C':0, 'C#':1, 'Db':1, 'D':2, 'D#':3, 'Eb':3, 'E':4, 'Fb':4, 'E#':5, 'F':5, 'F#':6, 'Gb':6, 'G':7, 'G#':8, 'Ab':8, 'A':9, 'A#':10, 'Bb':10, 'B':11, 'Cb':11, 'B#':0 };

let lineIdx = 0;

while (lineIdx < lines.length) {
    let line = lines[lineIdx++].trim();
    if (!line) continue;
    let [M, T] = line.split(/\s+/).map(Number);
    if (M === 0 && T === 0) break;

    let musicaNotas = lines[lineIdx++].trim().split(/\s+/);
    let musicaDiffs = "";

    for (let k = 1; k < M; k++) {
        let d = (mapa[musicaNotas[k]] - mapa[musicaNotas[k-1]] + 12) % 12;
        musicaDiffs += String.fromCharCode(d + 100);
    }
    
    let suspeitoNotas = lines[lineIdx++].trim().split(/\s+/);
    let suspeitoDiffs = "";
    for (let k = 1; k < T; k++) {
        let d = (mapa[suspeitoNotas[k]] - mapa[suspeitoNotas[k-1]] + 12) % 12;
        suspeitoDiffs += String.fromCharCode(d + 100);
    }

    if (T === 1) {
        process.stdout.write('S\n');
    } else if (T > M) {
        process.stdout.write('N\n');
    } else {
        process.stdout.write(musicaDiffs.indexOf(suspeitoDiffs) !== -1 ? 'S\n' : 'N\n');
    }
}