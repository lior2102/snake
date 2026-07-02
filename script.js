const grid=document.getElementById('grid');
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 20;
let appleIndex = 0;
let score = 0;
let timerId = 0;
let intervalTime = 200;
function createBoard(){
    for(let i=0; i<400; i++){
        const square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);
    }
}


createBoard();   

function startGame(){
        currentSnake.forEach(index=> squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(timerId);
        currentSnake = [2, 1, 0];
        score = 0; direction = 1; interValTime = 200;
        scoreDisplay.textContent = score;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        generateApple();
        timerId = setInterval(move, interValTime)
    }

function endGame(){
    playGo();
    currentSnake.forEach(index=> squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    return clearInterval(timerId);            
}

function move(){
    const hitBottom=(currentSnake[0]+20>=400 && direction === 20);
    const hitTop = (currentSnake[0]-20<0 && direction === -20);
    const hitRight = (currentSnake[0]%20 === 19 && direction === 1)
    const hitLeft = (currentSnake[0]%20 === 0 && direction === -1)
    const hitSelf = squares[currentSnake[0]+direction]?.classList.contains('snake');
    if (hitRight||hitBottom||hitTop|| hitLeft||hitSelf){
        endGame();
        return clearInterval(timerId);

    }
    const tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    const newHead = currentSnake[0] + direction;

    if (squares[newHead].classList.contains('apple')){
        playEat();
        squares[newHead].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        score++;
        scoreDisplay.textContent = score;

        generateApple();
}
currentSnake.unshift(newHead);

squares[newHead].classList.add('snake');

}
    document.addEventListener('touchstart', (e) => {
    touchstartX= e.changedTouches[0].screenX;
     touchstartY= e.changedTouches[0].screenY;
    
},false);
    document.addEventListener('touchend', (e) => {
    touchEndX= e.changedTouches[0].screenX;
     touchEndY= e.changedTouches[0].screenY;
     handleSwipe();
    
},false);



function generateApple(){
    do{
        appleIndex = Math.floor(Math.random()* squares.length);
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
}

function changeDir(newDir) {
    if (direction + newDir !== 0) {
        direction = newDir;
    }
}


document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') changeDir(-20);
    if (e.key === 'ArrowDown') changeDir (20);
    if (e.key === 'ArrowLeft') changeDir (-1);
    if (e.key === 'ArrowRight') changeDir (1); 
    
});

function handleSwipe(){
    const dx = touchEndX - touchstartX;
    const dy = touchEndY - touchstartY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (Math.max(absDx,absDy)> 30){
        if(absDx > absDy){
            if(dx>0)changeDir(1);
            else changeDir(-1);
        }else{
                if(dy>0)changeDir(20);
            else changeDir(-20);
        }
    }
}

const eat = new Audio('assets/e.mp3');
const go = new Audio('assets/o.mp3');

function playEat(){
    eat.currentTime = 0;
    eat.play();
}

function playGo(){
    go.play();
}

