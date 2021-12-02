var fs = require('fs');
var array = fs.readFileSync('./day2/input.txt').toString().split("\r\n").map(x => x.split(' '));

const p1 = () => {
    const horizontalPosition = array
        .filter(x => x[0] === 'forward')
        .map(x => Number.parseInt(x[1]))
        .reduce((acc, cur) => acc + cur);

    const depth = array
        .filter(x => x[0] !== 'forward')
        .map(x => x[0] === 'down' ? Number.parseInt(x[1]) : -Number.parseInt(x[1]))
        .reduce((acc, cur) => acc + cur)

    return horizontalPosition * depth;
}

const p2 = () => {
    let aim = 0;
    let horizontalPosition = 0;
    let depth = 0;

    array.forEach(row => {
        let [direction, value] = row;
        value = Number.parseInt(value);
        switch (direction) {
            case 'down':
                aim += value;
                break;
            case 'up':
                aim -= value;
                break;
            case 'forward': {
                horizontalPosition += value;
                depth += value * aim
            }
        }
    })

    return horizontalPosition * depth;
}

console.log(p1());
console.log(p2());