const grid = document.getElementById('grid');
const scoredisplay = document.getElementById('score');
let squares =[];
let currentsnake =[2, 1, 0];
let direction = 1
let appleIndex =0;
let score =0;
let timerID =0;
let intervalTime =200;

function createBoard(){
    for (let i = 0; i<400; i++){
        const square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);
    }
}
createBoard();

function startGame(){
    currentsnake.forEach(index =>squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(timerID);
}

function move(){
    const tail = currentsnake.pop();
    squares[tail].classList.remove('snake');
    const newHead = currentsnake[0] + direction;
    currentsnake.unshift(newHead);
    squares[newHead].classList.add('snake');
    const hitBottom = (currentsnake[0] +20 >= 40 && direction === 20);
    const hitTop = (currentsnake[0]- 20 < 0 && direction === -20);
    const hitRight = (currentsnake[0] % 20 === 19 && direction === 1);
    const hitLeft = (currentsnake[0] % 20 === 0 && direction === -1);
    const hitSelf = squares [currentsnake[0] + direction ]?.classList.contains('snake');
}

function generateApple(){
    do{appleIndex = Math.floor(Math.random() * squares.length);
    }while(squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
}

function changeDir (newDir){
    if (direction + newDir !==0){
        direction = newDir;
    }
}

document.addEventListener('keydown', (e) =>{
    if (e.key === "ArrowUp") changeDir (-20);
    if (e.key === "ArrowDown") changeDir (20);
    if (e.key === "ArrowLeft") changeDir (1);
    if (e.key === "ArrowRight") changeDir (-1);
});

generateApple();
setInterval(move, 200);
