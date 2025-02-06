let oldWindowWidth;
let oldWindowHeight;

function setup() {
  //set the canvas size the first time when the program starts
  createCanvas(windowWidth, windowHeight);
  oldWindowWidth = windowWidth;
  oldWindowHeight = windowHeight;

  player = new Player(width / 2, height / 2);
}

function draw() {
  ResizeCanvas();

  background(200);

  // Draw and update movement of the player
  player.move();
  player.show();
}

function ResizeCanvas() {
  // create a dinamically resizable canvas
  if (oldWindowWidth != windowWidth || oldWindowHeight != windowHeight){
    createCanvas(windowWidth, windowHeight);
    oldWindowWidth = windowWidth;
    oldWindowHeight = windowHeight;
  }
}