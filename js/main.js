// Getting canvas.
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Getting score and movements elements.
const scoreText = document.getElementById('scoreText');
const movementsText = document.getElementById('movementsText');

// Game settings.
const width = canvas.width;
const height = canvas.height;

const numberOfRows = 10;
const gridSize = width / numberOfRows;

let score = 0;
let movements = 8;

const player = new Character(0, 0);
const player2 = new Character(9, 9);

const players = [player, player2];

const treasure = new Treasure(numberOfRows);
treasure.setRandomPosition();

// Iteration 1
function drawGrid() {
  for (let row = 0; row < numberOfRows; row++) {
    for (let column = 0; column < numberOfRows; column++) {
      context.strokeRect(column * gridSize, row * gridSize, gridSize, gridSize);
    }
  }
}

function drawPlayer() {
  players.forEach((_player) => {
    context.drawImage(_player.sprites[_player.direction], _player.x * gridSize, _player.y * gridSize, gridSize, gridSize);
  });
}

function drawTreasure() {
  context.drawImage(treasure.img, treasure.x * gridSize, treasure.y * gridSize, gridSize, gridSize);
}

function drawEverything() {
  context.clearRect(0, 0, width, height);

  drawGrid();
  drawPlayer();
  drawTreasure();
  updateStats();
}

function playerMovement(key) {
  switch (key) {
    case 'a':
      player2.moveLeft();
      break;
    case 'ArrowLeft':
      player.moveLeft();
      break;
    case 'd':
      player2.moveRight();
      break;
    case 'ArrowRight':
      player.moveRight();
      break;
    case 's':
      player2.moveDown();
      break;
    case 'ArrowDown':
      player.moveDown();
      break;
    case 'w':
      player2.moveUp();
      break;
    case 'ArrowUp':
      player.moveUp();
      break;
  }

  movements--;

  players.forEach((_player) => {
    _player.checkBoundries();
    if (_player.x === treasure.x && _player.y === treasure.y) {
      score++;
      movements += Math.floor(8 - score * 0.3);
      treasure.setRandomPosition();
    }
  });

  if (movements === 0) {
    setTimeout(() => {
      alert(`You lost! Score: ${score}`);
      location.reload();
    }, 34);
  }
}

function updateStats() {
  scoreText.innerText = score;
  movementsText.innerText = movements;
}

// Check for keys
document.onkeydown = (e) => {
  playerMovement(e.key);
  drawEverything();
};

// When the page load, the first drawEveryThing will be executed after 1000ms to ensure images get loaded.
setTimeout(() => drawEverything(), 1000);
