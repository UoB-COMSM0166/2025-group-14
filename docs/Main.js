// Adapted from Daniel's main.js file. Added the pursuer object and a test canal (feel free to replace with your own 
// canal object once the canal feature is merged). This Main file is just for testing compatability between the Player
// and Pursuer features.

let oldWindowWidth;
let oldWindowHeight;

function setup() {
  //set the canvas size the first time when the program starts
  createCanvas(windowWidth, windowHeight);
  oldWindowWidth = windowWidth;
  oldWindowHeight = windowHeight;

  //to create a player object you need x coordinate, y coordinate, mass of the boat, and the boat speed limit 
  player = new Player(width / 2, height / 2, 5, 10);
  canal = new Canal(300, 100);
  pursuer = new Pursuer(100, 100, canal);
}

function draw() {
  ResizeCanvas();
  background(200);

  //to make the player model appear on the screen
  player.show();

  // pursuer object appear and behaviour
  let steering = pursuer.arrive(player);
  pursuer.applyForce(steering);
  pursuer.update();
  pursuer.show();
}


// create a dinamically resizable canvas
function ResizeCanvas() {
  if (oldWindowWidth != windowWidth || oldWindowHeight != windowHeight){
    createCanvas(windowWidth, windowHeight);
    oldWindowWidth = windowWidth;
    oldWindowHeight = windowHeight;
  }
}
