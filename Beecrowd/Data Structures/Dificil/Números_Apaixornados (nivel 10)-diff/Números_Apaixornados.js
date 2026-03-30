var input = `6
1 3 4 7 3 1
4
1 1 5 1
8
1 1 3 3 5 5 5 7
0
`

var lines = input.trim().split('\n').map(line => line.split(' ').filter(Boolean));

for (let i = 0; i < lines.length; i++) {
    let N = parseInt(lines[i][0]);
    if (N === 0) break;

    i++;
    let seq = lines[i].map(BigInt);
    
    let xorTotal = 0n;
    
    seq.forEach(a=> {
        xorTotal = xorTotal ^ a;
    });
    
    let bitDif = xorTotal & -xorTotal;
    
    let num1 = 0n;
    let num2 = 0n;
    
    seq.forEach(a => {
        if ((a & bitDif) !== 0n){
            num1 = num1 ^ a;
        } else {
            num2 = num2 ^ a;
        }
    })
    
    num1 = Number(num1);
    num2 = Number(num2);
    
    let menor = num1 < num2 ? num1 : num2;
    let maior = num1 < num2 ? num2 : num1;
    
    console.log(menor, maior);
}