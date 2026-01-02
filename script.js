const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const box = 20;

let snake, food, direction, score, game;

document.addEventListener("keydown", changeDirection);

function startGame() {
  showScreen("gameScreen");
  initGame();
  game = setInterval(draw, 120);
}

function restartGame() {
  showScreen("startScreen");
}

function initGame() {
  score = 0;
  direction = "RIGHT";
  document.getElementById("score").innerText = score;

  snake = [{ x: 10 * box, y: 10 * box }];

  food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
  };
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
}

function changeDirection(e) {
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Snake
  snake.forEach((part, index) => {
    ctx.fillStyle = index === 0 ? "#22c55e" : "#16a34a";
    ctx.fillRect(part.x, part.y, box, box);
  });

  // Food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;
  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;

  // Eat food
  if (headX === food.x && headY === food.y) {
    score++;
    document.getElementById("score").innerText = score;
    food = {
      x: Math.floor(Math.random() * 19) * box,
      y: Math.floor(Math.random() * 19) * box
    };
  } else {
    snake.pop();
  }

  const newHead = { x: headX, y: headY };

  // Game Over
  if (
    headX < 0 ||
    headY < 0 ||
    headX >= canvas.width ||
    headY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    document.getElementById("finalScore").innerText = score;
    showScreen("gameOverScreen");
  }

  snake.unshift(newHead);
}

function collision(head, body) {
  return body.some(part => part.x === head.x && part.y === head.y);
}
