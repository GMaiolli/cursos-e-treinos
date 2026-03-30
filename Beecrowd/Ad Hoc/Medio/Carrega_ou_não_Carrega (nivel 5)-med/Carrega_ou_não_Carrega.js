var input = `4 6
6 9
`

var lines = input.split('\n');

for (let line of lines) {
    if (line.trim() == '') continue;

    let [a, b] = line.split(' ').map(Number);

    console.log((a ^ b) >>> 0);
}