var input = `2

marrocos
+[>,]<-[+.<-]

nada
++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.
`

var lines = input.trim().split('\n').filter(line => line.trim() != '');

const N = parseInt(lines[0]);

let currentLine = 1;

for (let k = 1; k <= N; k++){
    const input1 = lines[currentLine++] || "";
    const input3 = lines[currentLine++] || "";

    const memoria = new Uint8Array(30000);

    let ponteiro = 0;

    let posEntrada = 0;

    let saida = "";

    const mapaDeSaltos = {};

    const pilha = [];

    for (let j = 0; j < input3.length; j++) {
        if (input3[j] === '[') pilha.push(j);
        if (input3[j] === ']') {
            const inicio = pilha.pop();
            mapaDeSaltos[inicio] = j;
            mapaDeSaltos[j] = inicio;
        }
    }

    for (let i = 0; i < input3.length; i++) {
        let comando = input3[i];

        switch (comando){
            case '>':
                ponteiro++;
                break;
            case '<':
                ponteiro--;
                break;
            case '+':
                memoria[ponteiro] += 1;
                break;
            case '-':
                memoria[ponteiro] -= 1;
                break;
            case '.':
                saida += String.fromCharCode(memoria[ponteiro]);
                break;
            case ',':
                memoria[ponteiro] = posEntrada < input1.length ? input1.charCodeAt(posEntrada++) : 0;
                break;
            case '[':
                if (memoria[ponteiro] === 0) i = mapaDeSaltos[i];
                break;
            case ']':
                if (memoria[ponteiro] !== 0) i = mapaDeSaltos[i];
                break;
            case '#':
                console.log(memoria.slice(0, 10).join(' '));
                break;
        }
    }

    console.log(`Instancia ${k}`);
    process.stdout.write(saida + "\n\n");
}