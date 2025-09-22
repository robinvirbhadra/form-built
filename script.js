// Select elements
const rod1 = document.getElementById("rod1");
const rod2 = document.getElementById("rod2");
const ball = document.getElementById("ball");
const game = document.getElementById("game");

let gameWidth = game.clientWidth;
let gameHeight = game.clientHeight;

let rodWidth = rod1.offsetWidth;
let ballDiameter = ball.offsetWidth;

let ballX = gameWidth / 2 - ballDiameter / 2;
let ballY = gameHeight / 2 - ballDiameter / 2;
let ballSpeedX = 2;
let ballSpeedY = 2;

let rodX = gameWidth / 2 - rodWidth / 2;
rod1.style.left = rodX + "px";
rod2.style.left = rodX + "px";

let score = 0;
let maxScore = localStorage.getItem("maxScore") || 0;
let maxPlayer = localStorage.getItem("maxPlayer") || "None";

// Start message
alert(
  maxScore == 0
    ? "This is your first time. Press Enter to start."
    : `${maxPlayer} has highest score of ${maxScore}. Press Enter to start.`
);

let gameInterval = null;

// Key controls
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (gameInterval !== null) return;
    resetBall();
    gameInterval = setInterval(moveBall, 10);
  }

  if (e.key === "a" || e.key === "A") {
    rodX = Math.max(0, rodX - 20);
  } else if (e.key === "d" || e.key === "D") {
    rodX = Math.min(gameWidth - rodWidth, rodX + 20);
  }

  rod1.style.left = rodX + "px";
  rod2.style.left = rodX + "px";
});

function resetBall() {
  ballX = gameWidth / 2 - ballDiameter / 2;
  ballY = gameHeight / 2 - ballDiameter / 2;
  ballSpeedX = 2;
  ballSpeedY = 2;
  score = 0;

  // ✅ Update ball position on reset
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
}

function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Bounce from walls
  if (ballX <= 0 || ballX + ballDiameter >= gameWidth) {
    ballSpeedX = -ballSpeedX;
  }

  // Bounce from top rod
  if (ballY <= rod1.offsetHeight) {
    if (ballX + ballDiameter >= rodX && ballX <= rodX + rodWidth) {
      ballSpeedY = -ballSpeedY;
      score++;
    } else {
      endGame("Rod2");
    }
  }

  // Bounce from bottom rod
  if (ballY + ballDiameter >= gameHeight - rod2.offsetHeight) {
    if (ballX + ballDiameter >= rodX && ballX <= rodX + rodWidth) {
      ballSpeedY = -ballSpeedY;
      score++;
    } else {
      endGame("Rod1");
    }
  }

  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
}

function endGame(winner) {
  clearInterval(gameInterval);
  gameInterval = null;

  if (score > maxScore) {
    maxScore = score;
    maxPlayer = winner;
    localStorage.setItem("maxScore", maxScore);
    localStorage.setItem("maxPlayer", maxPlayer);
  }

  alert(
    `${winner} wins with a score of ${score}. Max Score is ${maxScore} by ${maxPlayer}.`
  );
  resetBall();
}