const input = `5 2 10
0 0
5 10`;

const lines = input.trim().split(/\r?\n/);

var lineIdx = 0;
while (lineIdx < lines.length) {
    let line = lines[lineIdx++];
    if (!line || line.trim() === '') continue;

    let parts = line.trim().split(/\s+/);
    if (parts.length < 3) break;

    let N = parseInt(parts[0], 10);
    let M = parseInt(parts[1], 10);
    let Y = parseInt(parts[2], 10);

    let S = [];
    for (let i = 0; i < M; i++) {
        let sLine = lines[lineIdx++];
        let sParts = sLine.trim().split(/\s+/);
        S.push({ x: parseInt(sParts[0], 10), f: parseInt(sParts[1], 10) });
    }

    S.sort((a, b) => a.x - b.x);

    let R_target = 2 * Y - S[0].f - S[M - 1].f;
    if (R_target < 0 || R_target % 2 !== 0) {
        console.log('N');
        continue;
    }

    let requiredInternalSum = R_target / 2;
    let fixedInternalSum = 0;
    for (let i = 1; i < M - 1; i++) {
        fixedInternalSum += S[i].f;
    }

    let remainingNeeded = requiredInternalSum - fixedInternalSum;

    let L_arr = new Int32Array(M - 1);
    let Min_arr = new Float64Array(M - 1);
    let Max_arr = new Float64Array(M - 1);
    let TotalMin = 0;
    let TotalMax = 0;

    for (let j = 0; j < M - 1; j++) {
        let L = S[j + 1].x - S[j].x - 1;
        let min_val = Math.min(S[j].f, S[j + 1].f);
        let max_val = Math.max(S[j].f, S[j + 1].f);
        let min_sum = L * min_val;
        let max_sum = L * max_val;

        L_arr[j] = L;
        Min_arr[j] = min_sum;
        Max_arr[j] = max_sum;
        TotalMin += min_sum;
        TotalMax += max_sum;
    }

    if (remainingNeeded < TotalMin || remainingNeeded > TotalMax) {
        console.log('N');
        continue;
    }

    let suffixMax = new Float64Array(M - 1);
    let cur = 0;
    for (let j = M - 2; j >= 0; j--) {
        suffixMax[j] = cur;
        cur += Max_arr[j];
    }

    let ans = new Int32Array(N + 1);
    let ansIdx = 0;

    for (let j = 0; j < M - 1; j++) {
        let L = L_arr[j];
        if (L === 0) continue;

        let S_i = Math.max(Min_arr[j], remainingNeeded - suffixMax[j]);
        S_i = Math.min(S_i, Max_arr[j]);
        remainingNeeded -= S_i;

        let A = S[j].f;
        let B = S[j + 1].f;

        if (A <= B) {
            let prev = A;
            let rem_Si = S_i;
            for (let k = 1; k <= L; k++) {
                let remL = L - k;
                let max_after = remL * B;
                let v = Math.max(prev, rem_Si - max_after);
                ans[ansIdx++] = v;
                rem_Si -= v;
                prev = v;
            }
        } else {
            let rem_Si = S_i;
            for (let k = 1; k <= L; k++) {
                let remL = L - k + 1;
                let v = Math.floor((rem_Si + remL - 1) / remL);
                ans[ansIdx++] = v;
                rem_Si -= v;
            }
        }
    }

    if (ansIdx > 0) {
        console.log('S ' + ans.subarray(0, ansIdx).join(' '));
    } else {
        console.log('S');
    }
}