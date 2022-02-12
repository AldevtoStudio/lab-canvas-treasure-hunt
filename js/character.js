class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.direction = 'down';
    this.sprites = {};

    // Images direction/path pair value.
    const playerSprites = {
      left: 'images/character-left.png',
      up: 'images/character-up.png',
      right: 'images/character-right.png',
      down: 'images/character-down.png'
    };

    // Load and storing images.
    for (var orientation in playerSprites) {
      this.sprites[orientation] = new Image();
      this.sprites[orientation].src = playerSprites[orientation];
    }
  }

  checkBoundries() {
    this.x = Clamp(this.x, 0, 9);
    this.y = Clamp(this.y, 0, 9);
  }

  moveUp() {
    this.y--;
    this.direction = 'up';
  }

  moveRight() {
    this.x++;
    this.direction = 'right';
  }

  moveDown() {
    this.y++;
    this.direction = 'down';
  }

  moveLeft() {
    this.x--;
    this.direction = 'left';
  }
}

function Clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}
