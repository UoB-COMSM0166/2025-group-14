// Adapted from Daniel's main.js file. Added the pursuer object and a test canal (feel free to replace with your own 
// canal object once the canal feature is merged). This Main file is just for testing compatability between the Player
// and Pursuer features.

let oldWindowWidth;
let oldWindowHeight;
let c1, c2, c3, c4, c5, c6, b;  
const canalWidth = 60;

function setup() {
  //set the canvas size the first time when the program starts
  createCanvas(windowWidth, windowHeight);
  oldWindowWidth = windowWidth;
  oldWindowHeight = windowHeight;

  //to create a player object you need x coordinate, y coordinate, mass of the boat, and the boat speed limit 
  player = new Player(width / 2, height / 2, 5, 10);
  // canal = new oldCanal(300, 100);
  pursuer = new Pursuer(100, 100, canal);

  c1 = new canal(canalWidth, "Starter", 200, 300, 400, 450);
  c2 = new canal(canalWidth, "Steep", 250, 350, 330, 600);
  c3 = new canal(canalWidth, "ThirdElement", 200, 500, 550, 620);
  c4 = new canal(canalWidth, "Uphill", 550, 400, 600, 100);
  c5 = new canal(canalWidth, "Crossbar", 600, 150, 100, 150);
  c6 = new canal(canalWidth, "victory", 100, 150, 200, 300)
  c1.setConnections(c6, c2);
  c2.setConnections(c1, c3);
  c3.setConnections(c2, c4);
  c4.setConnections(c3, c5);
  c5.setConnections(c4, c6);
  c6.setConnections(c5, c1)
  b = new boat(2, c1, 220, 330, 10, 20);
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

  c1.visualize();
  c2.visualize();
  c3.visualize();
  c4.visualize();
  c5.visualize();
  c6.visualize();

  b.visualize();
}


// create a dinamically resizable canvas
function ResizeCanvas() {
  if (oldWindowWidth != windowWidth || oldWindowHeight != windowHeight){
    createCanvas(windowWidth, windowHeight);
    oldWindowWidth = windowWidth;
    oldWindowHeight = windowHeight;
  }
}
