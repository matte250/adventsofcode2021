
let array;

function preload() {
    array = loadStrings('./input.txt')
}

function setup() {
    array = array.map(x => x.split(' -> ').map(pos => (
        { x: parseInt(pos.split(',')[0]), y: parseInt(pos.split(',')[1])}
    )))

    createCanvas(1000, 1000);
    background(0);
    stroke(255)
    const mul = 100;
    array.forEach((pos, i) => {
        const m = i%3
        stroke(255, 255, 0, 125)
        line(pos[0].x, pos[0].y, pos[1].x, pos[1].y)
    })

    let intersectionsCount = 0;

    for(let x = 0; x<1000; x++){
        for(let y = 0; y<1000; y++){
            let i = 0;
            let row = array.filter(pos => pos[0].y === y && pos[1].y === y)
            row.forEach(pos => {
                const xFrom = Math.min(pos[0].x, pos[1].x);
                const xTo = Math.max(pos[0].x, pos[1].x);
                if(xFrom <= x &&  xTo >= x){
                    i++
                }
            })
            let column = array.filter(pos => pos[0].x === x && pos[1].x === x)
            column.forEach(pos => {
                const yFrom = Math.min(pos[0].y, pos[1].y);
                const yTo = Math.max(pos[0].y, pos[1].y);
                if(yFrom <= y &&  yTo >= y){
                    i++
                }
            })

            // vvv REMOVE FOR PART 1 vvv
            let diagonal = array.filter(pos => {
                const fromXDiff = Math.abs(x - pos[0].x)
                const fromYDiff = Math.abs(y - pos[0].y)
                if(fromXDiff !== fromYDiff)
                    return false;
                const toXDiff = Math.abs(x - pos[1].x)
                const toYDiff = Math.abs(y - pos[1].y)
                if(toXDiff !== toYDiff)
                    return false;
                const fromToXDiff = Math.abs(pos[0].x - pos[1].x)
                const fromToYDiff = Math.abs(pos[0].y - pos[1].y)
                if(fromToXDiff !== fromToYDiff)
                    return false;
                return true;
            })

            diagonal.forEach(pos => {
                const xFrom = Math.min(pos[0].x, pos[1].x);
                const xTo = Math.max(pos[0].x, pos[1].x);
                if(xFrom <= x &&  xTo >= x){
                    i++
                }
            })
            // ^^^ REMOVE FOR PART 1 ^^^

            if(i > 1) intersectionsCount++;
        }
    }
    textSize(32)
    stroke('black')
    fill('white')
    text(intersectionsCount, 10,35)
}

function draw() {
    
}