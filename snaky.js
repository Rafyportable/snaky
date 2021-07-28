class snaky {

  constructor(bodySize, color, startingPoint = {x: 200, y: 200}) {

    if(startingPoint.x % 10 !== 0 || startingPoint.y % 10 !== 0) {
      throw 'Starting point needs to be divisible by 10';
    }

    this.bodySize = bodySize;
    this.color = color;
    this.startingPoint = startingPoint;

  }




}

const snakeboard = document.getElementById("gameCanvas");
const snakeboard_ctx = gameCanvas.getContext("2d");
const board_background = "black";
const board_border = "black";
document.addEventListener("keydown", getKeyboardInput)

//TODO: Apple not to appear in the snake
//TODO: In progress 
//add score to the game 

//position of snake
let snake = [
  {x: 200, y: 200},
  {x: 190, y: 200},
  {x: 180, y: 200},
  {x: 170, y: 200},
  {x: 160, y: 200},
];

//position of apple
let apple = [{
  x: 250, y: 100
}]

//movement based on pixels
let dx = 10;
let dy = 10;

//initiallize the direction
let direction = "right";

setInterval(main, 120);

function drawSnakePart(snakePart) {  
  snakeboard_ctx.fillStyle = 'green';  
  snakeboard_ctx.strokestyle = 'white';
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

//Draw an apple and randomly puts the apple anywhere inside the canvas
function drawApple() {
  snakeboard_ctx.fillStyle = 'red';  
  snakeboard_ctx.strokestyle = 'orange';
  snakeboard_ctx.fillRect(apple[0].x, apple[0].y, 10, 10);
}

function drawSnake() {  
  snake.forEach(drawSnakePart);

}
function main() {


  if (gameOver()) {
    return;
  }
  clearCanvas();
  drawSnake();
  moveSnake();
  drawApple();
  foodEaten();

}

function clearCanvas() {

  snakeboard_ctx.fillStyle = board_background;
  snakeboard_ctx.strokestyle = board_border;
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);

}

function getKeyboardInput(event) {

  switch(event.key) {

    case "ArrowLeft":
      direction = "left"
      break;
    case "ArrowRight":
      direction = "right"
      break;
    case "ArrowDown":
      direction = "down"
      break;
    case "ArrowUp":
      direction = "up"
      break;

  }

}

function moveSnake() {

  let head = {x: snake[0].x, y: snake[0].y};

  switch(direction) {

    case "right":
      head = {x: snake[0].x + dx, y: snake[0].y};
      break;
    case "left":
      head = {x: snake[0].x - dx, y: snake[0].y};
      break;
    case "down":
      head = {x: snake[0].x, y: snake[0].y + dy};
      break;
    case "up":
      head = {x: snake[0].x, y: snake[0].y - dy};
      break;

    }
  
  snake.unshift(head);
  snake.pop();

}

//stops the game when collision occur
function gameOver() {

  for (let i = 4; i < snake.length; i++) {
    const has_collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y
    if (has_collided) {
      return true
    }
  }
  
  if (snake[0].x < 0 || snake[0].x > snakeboard.width || snake[0].y < 0 || snake[0].y > snakeboard.height) {
    return true;
  } else {
    return false;
  }

}

function foodEaten() {

  if (snake[0].x == apple[0].x && snake[0].y == apple[0].y) {

      apple[0].x = Math.floor(Math.random() * snakeboard.width / 10) * 10;
      apple[0].y = Math.floor(Math.random() * snakeboard.height / 10) * 10;
      snake.push({x: snake[snake.length - 1].x, y: snake[snake.length - 1].y});
  }
  
}
