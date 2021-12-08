var fs = require('fs');
var input = fs.readFileSync('./day7/input.txt').toString().split("\r\n");

const p1 = () => {
    const positions = input[0].split(',').map(x => parseInt(x)).reduce((acc,cur) => {
        if(!acc[cur]) acc[cur] = 0
        acc[cur] = acc[cur] + 1
        return acc;
    }, []);

    for(let i=0;i<positions.length;i++){
        if(positions[i] === undefined) positions[i] = 0;
    }

    let matchFound = false
    let index = Math.round(positions.length/2)
    let leftIndex = 0;
    let rightIndex = positions.length;

    do {

        const leftSideCount = positions.slice(0, index).reduce((acc, cur) => acc+cur,0);
        const rightSideCount = positions.slice(index, positions.length).reduce((acc, cur) => acc+cur,0);

        if(leftSideCount > rightSideCount){
            rightIndex = index;
            index = Math.round((leftIndex + rightIndex) / 2)
        } else if(rightSideCount > leftSideCount){
            leftIndex = index
            index = Math.round((leftIndex + rightIndex) / 2)
        }

        const diff = Math.abs(rightIndex-leftIndex);

        if(diff <= 1) {
            index = rightSideCount > leftSideCount ? rightIndex : leftIndex
            matchFound = true;
        }
    } while(matchFound == false)

    return positions.reduce((acc, cur, i) => {
        const diff = Math.abs(i-index) * cur;
        return acc + diff;
    }, 0)
}


const p2 = () => { 
    const positions = input[0].split(',').map(x => parseInt(x)).reduce((acc,cur) => {
        if(!acc[cur]) acc[cur] = 0
        acc[cur] = acc[cur] + 1
        return acc;
    }, []);

    for(let i=0;i<positions.length;i++){
        if(positions[i] === undefined) positions[i] = 0;
    }

    let lowestDiff = Number.MAX_SAFE_INTEGER;
    for(let i=0;i<positions.length;i++){
        lowestDiff = Math.min(lowestDiff, positions.reduce((acc, cur, y) => {
            const diff = Math.abs(y-i);
            let fuelCost = 0;
            for(let x = 0+1; x<diff+1;x++){
                fuelCost += x
            }
            return acc + (fuelCost * cur);
        }, 0))
    }
    return lowestDiff
}

console.log(p1());
console.log(p2());

// 10, 2