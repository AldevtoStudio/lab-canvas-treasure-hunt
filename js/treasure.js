class Treasure {
  constructor(tileSize) {
    this.maxX = tileSize;
    this.maxY = tileSize;
    this.img = new Image();
    this.img.src = 'images/treasure.png';
  }

  setRandomPosition() {
    this.x = Math.floor(Math.random() * this.maxX);
    this.y = Math.floor(Math.random() * this.maxY);
  }
}
