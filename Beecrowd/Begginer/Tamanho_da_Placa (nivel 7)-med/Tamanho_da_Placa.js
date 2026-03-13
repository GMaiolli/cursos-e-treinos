var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

let lineIdx = 0;

while (lineIdx < lines.length) {
    let currentLine = lines[lineIdx++];
    if (!currentLine || currentLine.trim() === "") continue;

    let [X, Y, M] = currentLine.split(' ').map(Number);

    for (let i = 0; i < M; i++) {
        let pedido = lines[lineIdx++];
        if (!pedido) break;
        
        let [Xi, Yi] = pedido.split(' ').map(Number);

        if ((Xi <= X && Yi <= Y) || (Xi <= Y && Yi <= X)) {
            console.log("Sim"); 
        } else {
            console.log("Nao");
        }
    }
}