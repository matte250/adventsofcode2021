var fs = require('fs');
var array = fs.readFileSync('./day3/input.txt').toString().split("\r\n");

const p1 = () => {
    const pivotedBits = array.reduce((acc, cur) => {
        [...cur].forEach((c, i) => {
            if(acc[i] === undefined)
                acc[i] = 0
            acc[i] += c === '1' ? 1 : -1;
        })
        return acc
    }, [])

    const gammaBinary = pivotedBits.reduce((acc, cur) =>  acc += cur > 0 ? '1' : '0', '')
    const gamma = parseInt(gammaBinary, '2');

    const epsilonBinary = [...gammaBinary].reduce((acc, cur) => acc += cur === '1' ? '0' : '1', '');
    const epsilon = parseInt(epsilonBinary, '2');
    return gamma * epsilon;
}


const p2 = () => {
    let oxygen = [...array]
    let counter = 0;
    while(oxygen.length > 1){
        const ones = oxygen.filter(x => x[counter] === '1')
        const zeros = oxygen.filter(x => x[counter] === '0')
        counter++;
        oxygen = ones.length >= zeros.length ? ones : zeros;
    }
    let co2 = [...array]
    counter = 0;
    while(co2.length > 1){
        const ones = co2.filter(x => x[counter] === '1')
        const zeros = co2.filter(x => x[counter] === '0')
        counter++;
        co2 = zeros.length <= ones.length ? zeros : ones;
    }

    return parseInt(oxygen[0], 2) * parseInt(co2[0], 2)
}

console.log(p1());
console.log(p2());