let oldWindowWidth;
let oldWindowHeight;

function setup() {
  //set the canvas size the first time when the program starts
  createCanvas(windowWidth, windowHeight);
  oldWindowWidth = windowWidth;
  oldWindowHeight = windowHeight;

  //to create a player object you need x coordinate, y coordinate, mass of the boat, and the boat speed limit 
  player = new Player(width / 2, height / 2, 10, 3);
}

function draw() {
  ResizeCanvas();
  background(200);

  //to make the player model appear on the screen
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