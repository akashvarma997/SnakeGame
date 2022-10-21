// all constants and variables
let inputDir = {x : 0 , y : 0};
const foodeatensound = new Audio('Music/foodEaten.mp3');
const gameoversound = new Audio('Music/gameover.mp3');
const movesound = new Audio('Music/move.mp3');
const musicsound = new Audio('Music/music.mp3');
let lastpainttime = 0; 
let speed = 10;
let score = 0;
let snakeArr = [
    {x: 10, y: 10}
];

let food = {x:6,y:7};

// All functions
function main(ctime){
    //console.log(ctime)
    window.requestAnimationFrame(main);
    if((ctime - lastpainttime)/1000 < 1/speed){
        return;
    }
    lastpainttime = ctime;
    gameEngine();
}

function isCollided(Arr){
    for (let i = 1; i < Arr.length; i++) {
        if(Arr[i].x === Arr[0].x && Arr[i].y === Arr[0].y){
            return true;
        } 
    }
    if(Arr[0].x >= 18 || Arr[0].x <= 0 || Arr[0].y >= 18 || Arr[0].y <= 0){
        return true;
    }
}

function gameEngine(){
    ///musicsound.play();
    // update snake and food
    // if snake collides
    if(isCollided(snakeArr)){
        gameoversound.play();
        musicsound.pause();
        inputDir = {x:0,y:0};
        score = 0;
        alert('Game Over! Please press any key to restart the game.');
        snakeArr = [{x:10, y:10}];
        musicsound.play();
    }

    // after eating the food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodeatensound.play();
        score += 1;
        if(score>hiscore){
            hiscore = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscore));
            hiScoreBox.innerHTML = "HiScore: " + hiscore;
        }
        scoreBox.innerHTML = 'Score:'+score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x:Math.round(a + (b-a)*Math.random()), y:Math.round(a + (b-a)*Math.random())}
        
    }

    // updating the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]}

    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    



    // display snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head')
        }else{
            snakeElement.classList.add('snakeBody')
        }
        

        board.appendChild(snakeElement);

    })

    // display food

        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);

}
// main function, main logic starts here.
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiScoreBox.innerHTML = "HiScore: " + hiscore;
}



window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x:0, y:1};
    musicsound.play(); 
    movesound.play();
    switch (e.key) {
        case 'ArrowUp':
            console.log('ArrowUp')
            inputDir.x = 0;
            inputDir.y = -1;
            break;
            
        case 'ArrowDown':
        console.log('ArrowDown')
        inputDir.x = 0;
        inputDir.y = 1;
        break;

        case 'ArrowLeft':
        console.log('ArrowLeft')
        inputDir.x = -1;
        inputDir.y = 0;
        break;
        
        case 'ArrowRight':
        console.log('ArrowRight')
        inputDir.x = 1;
        inputDir.y = 0;
        break;

        default:
            break;
    }
})



