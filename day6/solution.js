var fs = require('fs');
var input = fs.readFileSync('./day6/input.txt').toString().split("\r\n");

const p1 = () => {
    let pools = input[0].split(',').map(x => ({
        '1': parseInt(x)
    }))
    for (let i = 0; i < 80; i++) {
        pools.forEach(pool => {
            Object.keys(pool).forEach(key => {
                if (pool[key] === 0) {
                    pool[key] = 6
                    pool[Object.keys(pool).length + 1] = 8;
                } else {
                    pool[key] = pool[key] - 1
                }
            })
        })
    }
    return pools.reduce((acc, cur) => {
        return acc + Object.keys(cur).length
    }, 0)
}


const p2 = () => { 
    let pools = input[0].split(',').reduce((acc, cur, i) => {
        acc[cur] = !acc[cur] ? 1 : parseInt(acc[cur]) + 1
        return acc;
    }, {})
    pools[6] = 0;
    pools[7] = 0;
    pools[8] = 0;
    pools[9] = 0;


    for (let i = 0; i < 256; i++) {
        Object.keys(pools).forEach(key => {
            const curCount = pools[key] ?? 0
            if (key == 0) {
                pools[7] = (pools[7] ?? 0) + curCount
                pools[9] = (pools[9] ?? 0) + curCount
            } else {
                pools[key - 1] = (pools[key - 1] ?? 0) + curCount
            }
            pools[key] = 0;
        })
    }
    return Object.keys(pools).reduce((acc, cur) => {
        return pools[cur] + acc
    }, 0)
}

console.log(p1());
console.log(p2());

// 10, 2