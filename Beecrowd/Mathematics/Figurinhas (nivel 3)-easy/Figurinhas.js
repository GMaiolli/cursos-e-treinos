var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

function mdc(a, b){
    while (b !== 0) {
        let r = a % b;
        a = b;
        b = r;
    }
    return a;
}

let n = parseInt(lines[0]);

for (let j = 1; j <= n; j++) {
    let valores = lines[j].split(' ');
    
    let f1 = parseInt(valores[0]);
    let f2 = parseInt(valores[1]);
    
    console.log(mdc(f1, f2));
}