var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

const N = parseInt(lines[0].trim());

for (let i = 1; i <= N; i++) {
    let num = lines[i].trim();
    if (!num) continue;
    let numArray = num.split('');
    let nums = numArray.sort((a, b) => a - b);
    let index = nums.findIndex(digito => digito > '0');

    if (nums.includes('0')) {
        [nums[0], nums[index]] = [nums[index], nums[0]];
    }

    numCerto = nums.join('');

    console.log(numCerto);
}

