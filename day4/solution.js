var fs = require('fs');
const { json } = require('stream/consumers');
var array = fs.readFileSync('./day4/input.txt').toString().split("\r\n");

const p1 = () => {
    const bingoList = [...array];
    const bingoNumbers = bingoList.splice(0,1)[0].split(',').map(x => parseInt(x));
    bingoList.splice(0,1);
    rows = bingoList.map(row => row.split(' ').filter(x => x !== '').map(x => parseInt(x))).filter(x => x.length != 0)
    
    let rowsCopy = JSON.parse(JSON.stringify([...rows]));

    let boards = []

    while(rowsCopy.length > 0){
        const grid = rowsCopy.splice(0, 5);
        let columns = [];
        for(let x = 0; x<5; x++){
            let column = []
            for(let y = 0; y<5; y++){
                column.push(grid[y][x])
            }
            columns.push([...column])
        };
        boards.push({
            rows: JSON.parse(JSON.stringify([...grid])),
            columns: JSON.parse(JSON.stringify([...columns])),
            unmarked: JSON.parse(JSON.stringify([...grid.flat()]))
        })

    }
    let sum = null;
    let matchFound = false;
    bingoNumbers.forEach(num => {
        boards.forEach(board => {
            board.rows = board.rows.map(x => x.filter(e => e !== num ))
            board.columns = board.columns.map(x => x.filter(e => e !== num ))
            board.unmarked = board.unmarked.filter(x => x !== num);

            board.rows.forEach(x => {
                if(x.length === 0){
                    matchFound = true
                }
            })
            board.columns.forEach(x => {
                if(x.length === 0){
                    matchFound = true
                }
            })

            if(matchFound && sum === null){
                sum = board.unmarked.reduce((acc, cur) =>  acc+cur,0) * num;
            }
        })
    })
    return sum;
}


const p2 = () => {
    const bingoList = [...array];
    const bingoNumbers = bingoList.splice(0,1)[0].split(',').map(x => parseInt(x));
    bingoList.splice(0,1);
    rows = bingoList.map(row => row.split(' ').filter(x => x !== '').map(x => parseInt(x))).filter(x => x.length != 0)
    
    let rowsCopy = JSON.parse(JSON.stringify([...rows]));

    let boards = []

    while(rowsCopy.length > 0){
        const grid = rowsCopy.splice(0, 5);
        let columns = [];
        for(let x = 0; x<5; x++){
            let column = []
            for(let y = 0; y<5; y++){
                column.push(grid[y][x])
            }
            columns.push([...column])
        };
        boards.push({
            rows: JSON.parse(JSON.stringify([...grid])),
            columns: JSON.parse(JSON.stringify([...columns])),
            unmarked: JSON.parse(JSON.stringify([...grid.flat()])),
            isWinner: false,
        })

    }
    let sum = null;
    bingoNumbers.forEach(num => {
        boards.forEach(board => {
            board.rows = board.rows.map(x => x.filter(e => e !== num ))
            board.columns = board.columns.map(x => x.filter(e => e !== num ))
            board.unmarked = board.unmarked.filter(x => x !== num);

            board.rows.forEach(x => {
                if(x.length === 0){
                    board.isWinner = true
                }
            })
            board.columns.forEach(x => {
                if(x.length === 0){
                    board.isWinner = true
                }
            })

            if(boards.filter(x => x.isWinner).length === boards.length && sum === null){
                sum = board.unmarked.reduce((acc, cur) =>  acc+cur,0) * num;
            }
        })
    })
    return sum;
}

console.log(p1());
console.log(p2());