// var input = require('fs').readFileSync('/dev/stdin', 'utf8');
// var lines = input.split('\n');



let totalCentavos = Math.round(parseFloat(lines.shift()) * 100);

console.log("NOTAS:");
console.log(`${Math.floor(totalCentavos / 10000)} nota(s) de R$ 100.00`);
totalCentavos %= 10000;
console.log(`${Math.floor(totalCentavos / 5000)} nota(s) de R$ 50.00`);
totalCentavos %= 5000;
console.log(`${Math.floor(totalCentavos / 2000)} nota(s) de R$ 20.00`);
totalCentavos %= 2000;
console.log(`${Math.floor(totalCentavos / 1000)} nota(s) de R$ 10.00`);
totalCentavos %= 1000;
console.log(`${Math.floor(totalCentavos / 500)} nota(s) de R$ 5.00`);
totalCentavos %= 500;
console.log(`${Math.floor(totalCentavos / 200)} nota(s) de R$ 2.00`);
totalCentavos %= 200;
console.log("MOEDAS:");
console.log(`${Math.floor(totalCentavos / 100)} moeda(s) de R$ 1.00`);
totalCentavos %= 100;
console.log(`${Math.floor(totalCentavos / 50)} moeda(s) de R$ 0.50`);
totalCentavos %= 50;
console.log(`${Math.floor(totalCentavos / 25)} moeda(s) de R$ 0.25`);
totalCentavos %= 25;
console.log(`${Math.floor(totalCentavos / 10)} moeda(s) de R$ 0.10`);
totalCentavos %= 10;
console.log(`${Math.floor(totalCentavos / 5)} moeda(s) de R$ 0.05`);
totalCentavos %= 5;
console.log(`${Math.floor(totalCentavos / 1)} moeda(s) de R$ 0.01`);