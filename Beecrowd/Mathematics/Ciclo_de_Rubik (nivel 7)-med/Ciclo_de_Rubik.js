class cubo {
    constructor() {
        this.tipos = { CORNER: 'corner', EDGE: 'edge', CENTER: 'center'};
        this.pecas = this.gerarEstadoInicial();
    }

    gerarEstadoInicial() {
        let pecasArr = [];
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
                        tipo: tipo,
                        pos: { x, y, z },

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
    }

    //pra dps comprar se o cubo voltou a ficar montado
    isResolvido(estadoInicialString){
        return JSON.stringify(this.pecas) === estadoInicialString;
    }

    visualizar() {
        const getCor = (eixo, valor, c1, v1, c2, v2, face) => {
            const peca = this.pecas.find(p => p.pos[eixo] === valor && p.pos[c1] === v1 && p.pos[c2] === v2);
            return peca ? peca.cores[face] : '?';
        };

        const formatFace = (nome, eixo, valor, c1, v1s, c2, v2s, faceKey) => {
            console.log(`--- Face ${nome} ---`);
            v1s.forEach(v1 => {
                let linha = "";
                v2s.forEach(v2 => {
                    linha += getCor(eixo, valor, c1, v1, c2, v2, faceKey) + " ";
                });
                console.log(linha);
            });
        };

        // Renderiza as faces 
        // Cima (Y=1)
        formatFace("UP (Y)", "y", 1, "z", [-1, 0, 1], "x", [-1, 0, 1], "up");
        // Frente (Z=1)
        formatFace("FRONT (R)", "z", 1, "y", [1, 0, -1], "x", [-1, 0, 1], "front");
        // Baixo (Y=-1)
        formatFace("DOWN (W)", "y", -1, "z", [1, 0, -1], "x", [-1, 0, 1], "down");
        // Direita (X=1)
        formatFace("RIGHT (G)", "x", 1, "y", [1, 0, -1], "z", [1, 0, -1], "right");
        // Esquerda (X=-1)
        formatFace("LEFT (B)", "x", -1, "y", [1, 0, -1], "z", [-1, 0, 1], "left");
        // Trás (Z=-1)
        formatFace("BACK (O)", "z", -1, "y", [1, 0, -1], "x", [1, 0, -1], "back");
    };

    rotacionar(eixo, valorFixo, horario){
        //filtrar peças que estão na face
        let face = this.pecas.filter(p => p.pos[eixo] === valorFixo);

        face.forEach(p => {
            //gira a posição (x, y, z)
            let { x, y, z} = p.pos;
            switch (eixo) {
                //giro faces R e L
                case 'x':
                    let realHorarioX = (valorFixo === 1) ? horario : !horario;
                    p.pos.y = realHorarioX ? z : -z;
                    p.pos.z = realHorarioX ? -y : y;
                    this.permutarCores(p, 'up', 'back', 'down', 'front', realHorarioX);
                    break;
                //giro faces U e D
                case 'y':
                    let realHorarioY = (valorFixo === 1) ? horario : !horario;
                    p.pos.x = realHorarioY ? -z : z;
                    p.pos.z = realHorarioY ? x : -x;
                    this.permutarCores(p, 'front', 'left', 'back', 'right', realHorarioY);
                    break;
                //giro facez F e B
                case 'z':
                    let realHorarioZ = (valorFixo === 1) ? horario : !horario;
                    p.pos.x = realHorarioZ ? y : -y;
                    p.pos.y = realHorarioZ ? -x : x;
                    this.permutarCores(p, 'up', 'right', 'down', 'left', realHorarioZ)
                    break;
            }
        });
    }

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
    }

    executar(movimento) {
    switch (movimento) {
        case 'R': this.rotacionar('x',  1, true);  break; 
        case 'r': this.rotacionar('x',  1, false); break; 
        case 'L': this.rotacionar('x', -1, true);  break;
        case 'l': this.rotacionar('x', -1, false); break;
        case 'U': this.rotacionar('y',  1, true);  break;
        case 'u': this.rotacionar('y',  1, false); break;
        case 'D': this.rotacionar('y', -1, true);  break;
        case 'd': this.rotacionar('y', -1, false); break;
        case 'F': this.rotacionar('z',  1, true);  break;
        case 'f': this.rotacionar('z',  1, false); break;
        case 'B': this.rotacionar('z', -1, true);  break;
        case 'b': this.rotacionar('z', -1, false); break;
    }
}
};



const meuCubo = new cubo();
meuCubo.visualizar();
console.log("-------------------------")
meuCubo.executar("R");
meuCubo.visualizar();