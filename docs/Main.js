// Adapted from Daniel's main.js file. Added the pursuer object and a test canal (feel free to replace with your own 
// canal object once the canal feature is merged). This Main file is just for testing compatability between the Player
// and Pursuer features.

let oldWindowWidth;
let oldWindowHeight;
// let b;
const canalWidth = 80;
let LC = new LevelController();

function setup() {
  //set the canvas size the first time when the program starts
  createCanvas(windowWidth, windowHeight);
  oldWindowWidth = windowWidth;
  oldWindowHeight = windowHeight;

  let start = LC.testingLevel();

  //to create a player object you need x coordinate, y coordinate, mass of the boat, the boat speed limit, and the start canal 
  player = new Player(160, 320, 5, 3, start);
  // canal = new oldCanal(300, 100);
  // pursuer = new Pursuer(100, 200, canal);
}

function draw() {
  ResizeCanvas();
  background(200);

  // // pursuer object appear and behaviour
  // let steering = pursuer.arrive(player);
  // pursuer.applyForce(steering);
  // pursuer.update();
  // pursuer.show();

  //to make the player model appear on the screen
  player.show(); // visualising Daniil's boat
  LC.show();
}


// create a dinamically resizable canvas
function ResizeCanvas() {
  if (oldWindowWidth != windowWidth || oldWindowHeight != windowHeight){
    createCanvas(windowWidth, windowHeight);
    oldWindowWidth = windowWidth;
    oldWindowHeight = windowHeight;
  }
}
