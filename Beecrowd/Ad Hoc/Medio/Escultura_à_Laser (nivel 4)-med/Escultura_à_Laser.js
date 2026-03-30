var input = `5 8
1 2 3 2 0 3 4 5
3 3
1 0 2
4 3
4 4 1
0 0
`

var lines = input.trim().split('\n').map(line => line.split(' ').filter(Boolean).map(Number));


for (let i = 0; i < lines.length; i++) {
    let [A, C] = lines[i];
    if (A === 0 && C === 0) break;

    i++;
    let blocoAt = lines[i]
        .map(x => A - x)
        .reduce((acc, curr, idx, arr) => {
            if (idx === 0) return curr;
            if (curr > arr[idx - 1]) {
                return acc + (curr - arr[idx - 1]);
            }
            return acc;
        }, 0);
    console.log(blocoAt);
}