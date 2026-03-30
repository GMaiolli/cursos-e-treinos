var input; try { input = require('fs').readFileSync('/dev/stdin', 'utf8'); } catch(e) { input = '8 8\n...+...x\n........\n........\n...P....\n........\n........\n........\nB......+'; }
var tokens = input.trim().split(/\s+/);
var idx = 0;
var N = Number(tokens[idx++]);
var M = Number(tokens[idx++]);
var grid = [];
for (let i = 0; i < N; i++) grid.push(tokens[idx++]);

var porLinha = {}, porCol = {}, espelhos = [], posB;

for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
        let ch = grid[r][c];
        if (ch === '.') continue;
        let cel = { ch, r, c, id: -1 };
        if (ch === 'B') posB = cel;
        if (ch === '+' || ch === 'x') { cel.id = espelhos.length; espelhos.push(cel); }
        if (!porLinha[r]) porLinha[r] = [];
        if (!porCol[c]) porCol[c] = [];
        porLinha[r].push(cel);
        porCol[c].push(cel);
    }
}
for (let k in porLinha) porLinha[k].sort((a, b) => a.c - b.c);
for (let k in porCol) porCol[k].sort((a, b) => a.r - b.r);

function refletir(dir, tipo) {
    if (tipo === '+') return dir.dc === 1 ? { dr: -1, dc: 0 } : dir.dc === -1 ? { dr: 1, dc: 0 } : dir.dr === 1 ? { dr: 0, dc: -1 } : { dr: 0, dc: 1 };
    if (tipo === 'x') return dir.dc === 1 ? { dr: 1, dc: 0 } : dir.dc === -1 ? { dr: -1, dc: 0 } : dir.dr === 1 ? { dr: 0, dc: 1 } : { dr: 0, dc: -1 };
    return dir;
}

function proximo(atual, dir) {
    let eixo = dir.dr === 0 ? 'c' : 'r';
    let v = (dir.dr === 0 ? porLinha[atual.r] : porCol[atual.c]) || [];
    let lo = 0, hi = v.length;
    while (lo < hi) { let m = (lo + hi) >> 1; v[m][eixo] <= atual[eixo] ? lo = m + 1 : hi = m; }
    if ((dir.dr === 0 && dir.dc > 0) || dir.dr > 0) return v[lo] || null;
    let i = lo - 1;
    if (i >= 0 && v[i][eixo] === atual[eixo]) i--;
    return i >= 0 ? v[i] : null;
}

function resolver(atual, dir, cfg, vis) {
    let chave = `${atual.r},${atual.c},${dir.dr},${dir.dc},${cfg.join('')}`;
    if (vis.has(chave)) return null;
    vis.add(chave);
    let prox = proximo(atual, dir);
    if (!prox || (prox.ch !== '+' && prox.ch !== 'x' && prox.ch !== 'P')) return null;
    if (prox.ch === 'P') return cfg;
    let opcoes = cfg[prox.id] === '?' ? ['+', 'x'] : [cfg[prox.id]];
    for (let tipo of opcoes) {
        let novaCfg = cfg.slice();
        novaCfg[prox.id] = tipo;
        let res = resolver(prox, refletir(dir, tipo), novaCfg, vis);
        if (res) return res;
    }
    return null;
}

var resultado = resolver(posB, { dr: 0, dc: 1 }, Array(espelhos.length).fill('?'), new Set());
if (resultado) {
    console.log('YES ' + espelhos.map((e, i) => resultado[i] === '?' ? '+' : resultado[i]).join(''));
} else {
    console.log('NO');
}