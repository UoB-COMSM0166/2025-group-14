let oldWindowWidth;
let oldWindowHeight;

function setup() {
  //set the canvas size the first time when the program starts
  createCanvas(windowWidth, windowHeight);
  oldWindowWidth = windowWidth;
  oldWindowHeight = windowHeight;

  player = new Player(width / 2, height / 2, 10);
}

function draw() {
  ResizeCanvas();
  background(200);

  let current = createVector(0.2, 0);
  player.setCurrent(current);

  player.move();
  player.friction();
  player.show();
}


// create a dinamically resizable canvas
function ResizeCanvas() {
  if (oldWindowWidth != windowWidth || oldWindowHeight != windowHeight){
    createCanvas(windowWidth, windowHeight);
    oldWindowWidth = windowWidth;
    oldWindowHeight = windowHeight;
  }
}