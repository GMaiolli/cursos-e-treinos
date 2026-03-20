var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

const DNA = lines[0].trim();
const virus = lines[1].trim();

let prefixo = 0;
let sufixoDNA = DNA.length - 1;
let sufixoVirus = virus.length - 1;
let numSufixo = 0;

while (prefixo < DNA.length && prefixo < virus.length && DNA[prefixo] === virus[prefixo]) {
    prefixo++;
}

while (sufixoDNA >= prefixo && sufixoVirus >= prefixo && DNA[sufixoDNA] === virus[sufixoVirus]) {
    numSufixo++;
    sufixoDNA--;
    sufixoVirus--;
}

let tamVirus = virus.length - prefixo - numSufixo;

console.log(tamVirus < 0 ? 0 : tamVirus);