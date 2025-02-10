let pressedKeys = {};

function setup() {
  //set the canvas size the first time when the program starts
  createCanvas(windowWidth, windowHeight);
  canal = new Canal(600, 200);
  player = new Player(width / 2, height / 2, canal);
}

function draw() {
  background(0);
  // Draw the canal
  canal.draw();
  // Draw and update movement of the player
  player.move();
  player.draw();
}

function keyPressed() {
  pressedKeys[key] = true;
}

function keyReleased() {
  delete pressedKeys[key];
}
