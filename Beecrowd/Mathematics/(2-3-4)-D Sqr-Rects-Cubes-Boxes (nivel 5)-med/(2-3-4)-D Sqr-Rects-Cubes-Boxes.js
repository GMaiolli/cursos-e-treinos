var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

//na matematica todo quadrado é um retangulo mas um retangulo n é um quadrado!!!!

//logica de esticar dimensão considerando N = 2 para ser mais simples:
//1d é uma linha reta, quando pensamos no N nesse contexto, ele é intervalos nessa linha reta que, para gente fica mais facil de entender como base para um 2d, ficando |-|-|, onde | é o intervalo, assim sendo 3
//2d é quadrados, ele pega a linha e os intervalos e estica assim fazendo um 2x1, para fazer um 2x2 ele ele basicamente duplica o que esticou
//3d é cubos, como se esticasse para a direção Z, ent ficando 2x2x1, para fazer um 2x2x2 ele basicamente faz o msm q a pira do 2d, ele duplica o q esticou
//4d segue a msm logica para hipercubos, ele estica no eixo W (como somos limitados a 3d, é impossivel imaginar como é um realmente) ficando ent 2x2x2x1, e com a logica anterior, ele duplica o que esticou pra ficar 2x2x2x2

//com isso da para visualizar que, na linha, ele separa em 3 segmentos no plano cartesiano tipo pontos na linha, onde x, por exeplo, seria x1 = 0, x2 = 1 e x3 = 2, logo S1 = 3
//no quadrado, dps de esticar e duplicar, teria os msm pontos x1 = 0, x2 = 1 e x3 = 2, porem ele add o y, assim tendo o "quadrado maior" com pontos no plano cartesiano como por exemplo = (0,0) (1,0) (2,0) (0,1) (1,1) (2,1) (6 pontos), assim gerando 2 quadrados 2x1 e um retangulo 1x2 (ou seja, 3 retangulos), para gerar o quadrado 2x2, basicamente duplicamos para o eixo Y, assim ficando pontos no (0,0) (1,0) (2,0) (0,1) (1,1) (2,1) (0,2) (2,1) (2,2), assim totalizando 9 pontos, significando 9 retangulos (como disse, quadrados tbm sao retangulos), mas para separar exatamente quadrados podemos usar a logica de contar os extremos (0,0) (2,0) (0,2) (2,0) e o ponto central que separa os minis quadrados (1,1), assim sabemos q tem 5 quadrados ao todo (seria basicamente duplicar os quadrados de 2x1 e considerar o quadrado grandao 2x2)
//no cubo, ele estica no eixo y assim tendo todos os (0,0) (1,0) (2,0) (0,1) (1,1) (2,1) (0,2) (2,1) (2,2) + o eixo z, ficnado pontos nos (0,0,0) (1,0,0) (2,0,0) (0,1,0) (1,1,0) (2,1,0) (0,2,0) (2,1,0) (2,2,0)(0,0,1) (1,0,1) (2,0,1) (0,1,1) (1,1,1) (2,1,1) (0,2,1) (2,1,1) (2,2,1) ficando 18 pontos, representando 4 cubos + 4 paralelepipedos formado por cubos + 1 paralelepipedo gerado pegando os extremos = 9 paralelepipedos totais, assim ficando um paralelepipedo total de 2x2x1, pra levar pra 2x2x2 duplicamos essa nossa nova dimensão no eixo Z, assim adicionamos a camada onde z=2, ganhando mais 9 pontos (0,0,2) (1,0,2) (2,0,2) (0,1,2) (1,1,2) (2,1,2) (0,2,2) (2,1,2) (2,2,2), totalizando finalmente 27 pontos na nossa grade 3D, com isso sabemos que duplicamos os mini cubos de 4 para 8 e tem mais o cubo dos extremos totalizando 9 cubos
//antes de ir para o hipercubo, vamos assumir que Seguimento = S = N + 1 assim percebe-se o padrao 3 -> 5 -> 9 para numero de cubos/quadrados (repare que é ST = 1**D + ... + (N-2)**D + (N-1)**D + N**D) que onde N é elevado por D na quantidade de N sendo subitraida até ser 1 e de pontos totais foi de 3 -> 9 -> 27 (pega sequimentos que é RT = S**N, pq ele pega aqueles pontos do 1D e sobe a mesma quantidade no eixo Y pra gerar o 2D e pro 3D ele basicamente faz o mesmo só que no eixo Z)
//com isso o hipercubo vai ser seguir as formulas que falei voltadas a ser esticada no eixo W
//e como o exercicio pede retangulos que não sao quadrados, fica basicamente RSQ = RT - ST

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line === "") continue;

    let N = parseInt(line);
    let output = [];
    for (let D = 2; D <= 4; D++) {
        let ST = 0;
        
        // Calcula a Soma de Cubos (ST) para a dimensão atual D
        for (let k = 1; k <= N; k++) {
            ST += Math.pow(k, D);
        }
        
        // RT é o total de blocos (paralelepípedos/retângulos)
        // Usando a fórmula (N*(N+1)/2)^D que deduzimos
        let S1 = (N * (N + 1)) / 2;
        let RT = Math.pow(S1, D);
        
        // RSQ = Retângulos/Paralelepípedos que NÃO são Quadrados/Cubos
        let RSQ = RT - ST;

        output.push(ST);
        output.push(RSQ);
    }
    console.log(output.join(' '));
}