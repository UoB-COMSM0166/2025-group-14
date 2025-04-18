// Adapted from Daniel's main.js file. Added the pursuer object and a test canal (feel free to replace with your own 
// canal object once the canal feature is merged). This Main file is just for testing compatability between the Player
// and Pursuer features.

let oldWindowWidth;
let oldWindowHeight;
let c1, c2, c3, c4, c5, c6;  
// let b;
const canalWidth = 80;

function setup() {
  //set the canvas size the first time when the program starts
  createCanvas(windowWidth, windowHeight);
  oldWindowWidth = windowWidth;
  oldWindowHeight = windowHeight;

  //note to self: when putting the lock back in, just add "5, 3" to the end of the arguments

  c1 = new canal(canalWidth, "Starter", 200, 300, 400, 450);
  c2 = new canal(canalWidth, "Steep", 250, 350, 330, 600);
  c3 = new fork(canalWidth, "ThirdElement", 200, 500, 550, 620);
  c4 = new fork(canalWidth, "Uphill", 700, 400, 1000, 100);
  c5 = new canal(canalWidth, "Crossbar", 600, 150, 100, 150);
  c6 = new canal(canalWidth, "victory", 100, 150, 200, 300);
  c7 = new diversion(canalWidth, "Offshoot", 800, 330, 1000, 400, "out");
  c8 = new canal(canalWidth, "Descend!", 970, 400, 1000, 800);
  c9 = new canal(canalWidth, "Lock", 1000, 700, 700, 900);
  c10 = new canal(canalWidth, "Sneaksup", 700, 900, 300, 800);
  c11 = new diversion(canalWidth, "Rejoin", 490, 800, 400, 560, "in"); //490 800 400 560
  c1.setConnections(c6, c2);
  c2.setConnections(c1, c3);
  c3.setConnections(c2, c4, c11);
  c4.setConnections(c3, c5, c7);
  c5.setConnections(c4, c6);
  c6.setConnections(c5, c1);
  c7.setConnections(c4, c8);
  c8.setConnections(c7, c9);
  c9.setConnections(c8, c10);
  c10.setConnections(c9, c11);
  c11.setConnections(c10, c3); 

  // b = new boat(2, c1, 250, 200, 10, 20);

  //to create a player object you need x coordinate, y coordinate, mass of the boat, the boat speed limit, and the start canal 
  player = new Player(160, 320, 5, 3, c6);
  // canal = new oldCanal(300, 100);
  pursuer = new Pursuer(100, 200, canal);
}

function draw() {
  ResizeCanvas();
  background(200);

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
  c7.visualize();
  c8.visualize();
  c9.visualize();
  c10.visualize();
  c11.visualize();

  // b.visualize(); // visualising the Leah's boat

  //to make the player model appear on the screen
  player.show(); // visualising Daniil's boat
}


// create a dinamically resizable canvas
function ResizeCanvas() {
  if (oldWindowWidth != windowWidth || oldWindowHeight != windowHeight){
    createCanvas(windowWidth, windowHeight);
    oldWindowWidth = windowWidth;
    oldWindowHeight = windowHeight;
  }
}
