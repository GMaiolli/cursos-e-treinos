export default class Cubo {
    constructor() {
        this.tipos = { CORNER: 'corner', EDGE: 'edge', CENTER: 'center'};
        this.pecas = this.gerarEstadoInicial();
    };

    gerarEstadoInicial() {
        let pecasArr = [];
        let id = 0;
        // Frente: R, Direita: G, Esquerda: B, Baixo: W, Cima: Y, Trás: O

        for (let x = -1; x <= 1; x++){
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    //ignorar o miolo (cubo que fica no meio e n aparece)
                    if (x === 0 && y === 0 && z === 0) continue;

                    let numCores = [x, y, z].filter(coord => coord !== 0).length;
                    let tipo = numCores === 3 ? this.tipos.CORNER :
                               numCores === 2 ? this.tipos.EDGE :
                               this.tipos.CENTER;
                    
                    //gerar as peças nas posições e "pintar" elas
                    pecasArr.push({
                        id: id++,
                        tipo: tipo,
                        pos: { x, y, z },
                        rot: { x: 0, y: 0, z: 0 },

                        cores: {
                            up: y === 1 ? 'Y' : null,
                            down: y === -1 ? 'W' : null,
                            front: z === 1 ? 'R' : null,
                            back: z === -1 ? 'O' : null,
                            right: x === 1 ? 'G' : null,
                            left: x === -1 ? 'B' : null,
                        }
                    });
                }
            }
        }
        return pecasArr;
    };

    //verifica se cada face do cubo tem uma cor única (cubo montado)
    isResolvido() {
        const faces = [
            { eixo: 'x', valor:  1, lado: 'right' },
            { eixo: 'x', valor: -1, lado: 'left' },
            { eixo: 'y', valor:  1, lado: 'up' },
            { eixo: 'y', valor: -1, lado: 'down' },
            { eixo: 'z', valor:  1, lado: 'front' },
            { eixo: 'z', valor: -1, lado: 'back' },
        ];

        return faces.every(({ eixo, valor, lado }) => {
            const pecasDaFace = this.pecas.filter(p => p.pos[eixo] === valor);
            const cores = pecasDaFace.map(p => p.cores[lado]).filter(c => c !== null);
            return cores.length > 0 && cores.every(c => c === cores[0]);
        });
    };

    rotacionar(eixo, valorFixo, horario) {
        let face = this.pecas.filter(p => p.pos[eixo] === valorFixo);

        face.forEach(p => {
            let { x, y, z} = p.pos;
            let realHorario = (valorFixo === 1) ? horario : !horario;

            switch (eixo){
                case 'x':
                    p.pos.y = realHorario ? z : -z;
                    p.pos.z = realHorario ? -y : y;
                    this.permutarCores(p, 'up', 'back', 'down', 'front', realHorario);
                    break;
                case 'y':
                    p.pos.x = realHorario ? -z : z;
                    p.pos.z = realHorario ? x : -x;
                    this.permutarCores(p, 'right', 'front', 'left', 'back', realHorario);
                    break;
                case 'z':
                    p.pos.x = realHorario ? y : -y;
                    p.pos.y = realHorario ? -x : x;
                    this.permutarCores(p, 'right', 'down', 'left', 'up', realHorario);
                    break;
            }
        });
    };

    permutarCores(peca, a, b, c, d, horario) {
        let cores = peca.cores;
        if (horario) {
            let temp = cores[a];
            cores[a] = cores[d];
            cores[d] = cores[c];
            cores[c] = cores[b];
            cores[b] = temp;
        } else {
            // logica inversa para anti-horário
            let temp = cores[a];
            cores[a] = cores[b];
            cores[b] = cores[c];
            cores[c] = cores[d];
            cores[d] = temp;
        }
    };

    executar(movimento) {
        switch (movimento) {
            case 'R': this.rotacionar('x',  1, true);  break; 
            case 'r': this.rotacionar('x',  1, false); break; 
            case 'L': this.rotacionar('x', -1, true);  break;
            case 'l': this.rotacionar('x', -1, false); break;
            case 'M': this.rotacionar('x',  0, true);  break;
            case 'm': this.rotacionar('x',  0, false); break;
            case 'U': this.rotacionar('y',  1, true);  break;
            case 'u': this.rotacionar('y',  1, false); break;
            case 'D': this.rotacionar('y', -1, true);  break;
            case 'd': this.rotacionar('y', -1, false); break;
            case 'E': this.rotacionar('y',  0, true);  break;
            case 'e': this.rotacionar('y',  0, false); break;
            case 'F': this.rotacionar('z',  1, true);  break;
            case 'f': this.rotacionar('z',  1, false); break;
            case 'B': this.rotacionar('z', -1, true);  break;
            case 'b': this.rotacionar('z', -1, false); break;
            case 'S': this.rotacionar('z',  0, true);  break;
            case 's': this.rotacionar('z',  0, false); break;
        }      
    };

    getPecasDaFace(eixo, valorFixo) {
        return this.pecas.filter(p => p.pos[eixo] === valorFixo);
    }

    embaralhar(numMovimentos = 20) {
        const movimentos = ['R', 'r', 'L', 'l', 'U', 'u', 'D', 'd', 'F', 'f', 'B', 'b'];
        const faces = { 'R': 'x1', 'r': 'x1', 'L': 'x-1', 'l': 'x-1',
                        'U': 'y1', 'u': 'y1', 'D': 'y-1', 'd': 'y-1',
                        'F': 'z1', 'f': 'z1', 'B': 'z-1', 'b': 'z-1' };
        const sequencia = [];
        let ultimaFace = '';

        for (let i = 0; i < numMovimentos; i++) {
            let mov;
            do {
                mov = movimentos[Math.floor(Math.random() * movimentos.length)];
            } while (faces[mov] === ultimaFace);
            ultimaFace = faces[mov];
            sequencia.push(mov);
        }
        return sequencia;
    }

    getParametrosMovimento(movimento) {
        const map = {
            'R': { eixo: 'x', valorFixo:  1, horario: true },
            'r': { eixo: 'x', valorFixo:  1, horario: false },
            'L': { eixo: 'x', valorFixo: -1, horario: true },
            'l': { eixo: 'x', valorFixo: -1, horario: false },
            'M': { eixo: 'x', valorFixo:  0, horario: true },
            'm': { eixo: 'x', valorFixo:  0, horario: false },
            'U': { eixo: 'y', valorFixo:  1, horario: true },
            'u': { eixo: 'y', valorFixo:  1, horario: false },
            'D': { eixo: 'y', valorFixo: -1, horario: true },
            'd': { eixo: 'y', valorFixo: -1, horario: false },
            'E': { eixo: 'y', valorFixo:  0, horario: true },
            'e': { eixo: 'y', valorFixo:  0, horario: false },
            'F': { eixo: 'z', valorFixo:  1, horario: true },
            'f': { eixo: 'z', valorFixo:  1, horario: false },
            'B': { eixo: 'z', valorFixo: -1, horario: true },
            'b': { eixo: 'z', valorFixo: -1, horario: false },
            'S': { eixo: 'z', valorFixo:  0, horario: true },
            's': { eixo: 'z', valorFixo:  0, horario: false },
        };
        return map[movimento] || null;
    }
};