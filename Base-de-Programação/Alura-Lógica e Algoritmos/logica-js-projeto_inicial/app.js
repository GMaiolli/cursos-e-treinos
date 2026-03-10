alert("Boas vindas ao jogo do número secreto!");

let numMax = 100;
let numMin = 0;

let numeroSecreto = parseInt(Math.random() * (numMax - numMin + 1) + numMin);
console.log("O número secreto é: " + numeroSecreto);
let chute;
let tentativas = 0;

while(chute != numeroSecreto) {
    chute = prompt(`Digite um número entre ${numMin} e ${numMax}`);
    tentativas++;
    
    if (chute == numeroSecreto) {
        let palavra = tentativas == 1 ? "tentativa" : "tentativas";
        alert("Parabéns! Você acertou o número secreto em " + tentativas + " " + palavra + "!");
        break;
    } else if (chute > numeroSecreto) {
        alert("O número secreto é menor do que " + chute);
    } else {
        alert("O número secreto é maior do que " + chute);
    }
}