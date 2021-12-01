const fs = require('fs');
const readline = require('readline')

const filesStream = fs.createReadStream('E:/Projects mate/adventsofcode2021/day1/input.txt');
const rl = readline.createInterface({input: filesStream, crlfDelay: Infinity});

let count = 0;
let previousValue = null;
let values = [];

for await (const line of rl){
    values.push(Number.parseInt(line))
}

for(let i = 0; i<values.length-2; i++){
    const sum = values.slice(i, i+3).reduce((acc, cur) => acc + cur);
    if(previousValue !== null && sum > previousValue)
        count++
    previousValue = sum;
}

console.log(count)