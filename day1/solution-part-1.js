const fs = require('fs');
const readline = require('readline')

const filesStream = fs.createReadStream('./day1/input.txt');
const rl = readline.createInterface({input: filesStream, crlfDelay: Infinity});

let count = 0;
let previousValue = null;
for await (const line of rl){
    const currentValue = Number.parseInt(line);
    if(previousValue !== null && currentValue > previousValue)
        count++
    previousValue = currentValue;
}

console.log(count)