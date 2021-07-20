const snakeboard = document.getElementById("gameCanvas");
const snakeboard_ctx = gameCanvas.getContext("2d");
const board_background = "white";
const board_border = "black";
document.addEventListener("keydown", getKeyboardInput)

let snake = [
  {x: 200, y: 200},
  {x: 190, y: 200},
  {x: 180, y: 200},
  {x: 170, y: 200},
  {x: 160, y: 200},
];
let dx = 10;
let dy = 10;
let direction = "right";

setInterval(main, 1000);

function drawSnakePart(snakePart) {  
  snakeboard_ctx.fillStyle = 'lightblue';  
  snakeboard_ctx.strokestyle = 'white';
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() 
{  
  snake.forEach(drawSnakePart);
}

function main() {
  clearCanvas();
  drawSnake();
  moveSnake();
  console.log("main has run");
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
  let head = {};
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