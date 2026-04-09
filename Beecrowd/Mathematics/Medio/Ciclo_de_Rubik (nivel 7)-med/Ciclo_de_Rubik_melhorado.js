class Cubo {
    constructor() {
        this.tipos = { CORNER: 'corner', EDGE: 'edge', CENTER: 'center' };
        this.pecas = this.gerarEstadoInicial();
        this.estadoInicial = this.estadoCanonico();
    }

    gerarEstadoInicial() {
        const pecas = [];

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    if (x === 0 && y === 0 && z === 0) continue;

                    const numCores = (x !== 0 ? 1 : 0) + (y !== 0 ? 1 : 0) + (z !== 0 ? 1 : 0);
                    const tipo = numCores === 3
                        ? this.tipos.CORNER
                        : numCores === 2
                            ? this.tipos.EDGE
                            : this.tipos.CENTER;

                    pecas.push({
                        tipo: tipo,
                        pos: { x, y, z },
                        cores: {
                            up: y === 1 ? 'Y' : null,
                            down: y === -1 ? 'W' : null,
                            front: z === 1 ? 'R' : null,
                            back: z === -1 ? 'O' : null,
                            right: x === 1 ? 'G' : null,
                            left: x === -1 ? 'B' : null
                        }
                    });
                }
            }
        }

        return pecas;
    }

    estadoCanonico() {
        const copia = this.pecas.map(function (peca) {
            return {
                tipo: peca.tipo,
                pos: { x: peca.pos.x, y: peca.pos.y, z: peca.pos.z },
                cores: {
                    up: peca.cores.up,
                    down: peca.cores.down,
                    front: peca.cores.front,
                    back: peca.cores.back,
                    right: peca.cores.right,
                    left: peca.cores.left
                }
            };
        });

        copia.sort(function (a, b) {
            if (a.pos.x !== b.pos.x) return a.pos.x - b.pos.x;
            if (a.pos.y !== b.pos.y) return a.pos.y - b.pos.y;
            return a.pos.z - b.pos.z;
        });

        return JSON.stringify(copia);
    }

    isResolvido() {
        return this.estadoCanonico() === this.estadoInicial;
    }

    visualizar() {
        const getCor = (eixo, valor, c1, v1, c2, v2, face) => {
            const peca = this.pecas.find(function (p) {
                return p.pos[eixo] === valor && p.pos[c1] === v1 && p.pos[c2] === v2;
            });
            return peca ? peca.cores[face] : '?';
        };

        const faces = [
            { nome: 'UP (Y)', eixo: 'y', valor: 1, c1: 'z', v1s: [-1, 0, 1], c2: 'x', v2s: [-1, 0, 1], faceKey: 'up' },
            { nome: 'FRONT (R)', eixo: 'z', valor: 1, c1: 'y', v1s: [1, 0, -1], c2: 'x', v2s: [-1, 0, 1], faceKey: 'front' },
            { nome: 'DOWN (W)', eixo: 'y', valor: -1, c1: 'z', v1s: [1, 0, -1], c2: 'x', v2s: [-1, 0, 1], faceKey: 'down' },
            { nome: 'RIGHT (G)', eixo: 'x', valor: 1, c1: 'y', v1s: [1, 0, -1], c2: 'z', v2s: [1, 0, -1], faceKey: 'right' },
            { nome: 'LEFT (B)', eixo: 'x', valor: -1, c1: 'y', v1s: [1, 0, -1], c2: 'z', v2s: [-1, 0, 1], faceKey: 'left' },
            { nome: 'BACK (O)', eixo: 'z', valor: -1, c1: 'y', v1s: [1, 0, -1], c2: 'x', v2s: [1, 0, -1], faceKey: 'back' }
        ];

        for (const face of faces) {
            console.log('--- Face ' + face.nome + ' ---');
            for (const v1 of face.v1s) {
                let linha = '';
                for (const v2 of face.v2s) {
                    linha += getCor(face.eixo, face.valor, face.c1, v1, face.c2, v2, face.faceKey) + ' ';
                }
                console.log(linha.trim());
            }
        }
    }

    permutarCores(peca, a, b, c, d, horario) {
        const cores = peca.cores;
        const temp = cores[a];

        if (horario) {
            cores[a] = cores[d];
            cores[d] = cores[c];
            cores[c] = cores[b];
            cores[b] = temp;
        } else {
            cores[a] = cores[b];
            cores[b] = cores[c];
            cores[c] = cores[d];
            cores[d] = temp;
        }
    }

    rotacionar(eixo, valorFixo, horario) {
        const face = this.pecas.filter(function (p) {
            return p.pos[eixo] === valorFixo;
        });

        for (const p of face) {
            const x = p.pos.x;
            const y = p.pos.y;
            const z = p.pos.z;
            const realHorario = valorFixo === 1 ? horario : !horario;

            if (eixo === 'x') {
                p.pos.y = realHorario ? z : -z;
                p.pos.z = realHorario ? -y : y;
                this.permutarCores(p, 'up', 'back', 'down', 'front', realHorario);
            } else if (eixo === 'y') {
                p.pos.x = realHorario ? -z : z;
                p.pos.z = realHorario ? x : -x;
                this.permutarCores(p, 'front', 'left', 'back', 'right', realHorario);
            } else if (eixo === 'z') {
                p.pos.x = realHorario ? y : -y;
                p.pos.y = realHorario ? -x : x;
                this.permutarCores(p, 'up', 'right', 'down', 'left', realHorario);
            }
        }
    }

    executar(movimento) {
        const mapaMovimentos = {
            R: { eixo: 'x', valorFixo: 1, horario: true },
            r: { eixo: 'x', valorFixo: 1, horario: false },
            L: { eixo: 'x', valorFixo: -1, horario: true },
            l: { eixo: 'x', valorFixo: -1, horario: false },
            U: { eixo: 'y', valorFixo: 1, horario: true },
            u: { eixo: 'y', valorFixo: 1, horario: false },
            D: { eixo: 'y', valorFixo: -1, horario: true },
            d: { eixo: 'y', valorFixo: -1, horario: false },
            F: { eixo: 'z', valorFixo: 1, horario: true },
            f: { eixo: 'z', valorFixo: 1, horario: false },
            B: { eixo: 'z', valorFixo: -1, horario: true },
            b: { eixo: 'z', valorFixo: -1, horario: false }
        };

        const comando = mapaMovimentos[movimento];
        if (!comando) {
            throw new Error('Movimento invalido: ' + movimento);
        }

        this.rotacionar(comando.eixo, comando.valorFixo, comando.horario);
    }

    executarSequencia(sequencia) {
        for (const movimento of sequencia) {
            this.executar(movimento);
        }
    }
}

const meuCubo = new Cubo();

console.log('Estado inicial:');
meuCubo.visualizar();
console.log('-------------------------');

meuCubo.executarSequencia('RUrF');
console.log('Apos sequencia RUrF:');
meuCubo.visualizar();
console.log('Resolvido?', meuCubo.isResolvido() ? 'SIM' : 'NAO');
