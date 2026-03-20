var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

let n = parseInt(lines[0]);

for (let i = 1; i <= n; i++) {
    let input1 = lines[i];

    if (!input1) continue;

    input1 = input1.replace(/\r/g, "");

    let resul1 = input1.split('').map(char => {
        if (/[a-zA-Z]/.test(char)) {
            return String.fromCharCode(char.charCodeAt(0) + 3);
        } else  {
            return char;
        }
    }).join('')
    
    let inputAInv = resul1.split('').reverse();
    
    let inputSInv = inputAInv.join('');
    
    let met2 = inputSInv.slice(inputSInv.length / 2);
    
    met2 = met2.split('').map(char => {
        return String.fromCharCode(char.charCodeAt(0) - 1);
    }).join('');
    
    let stringMeio = Math.floor(resul1.length / 2);
    let resul2 = inputSInv.slice(0, stringMeio) + met2;
    
    console.log(resul2);
}