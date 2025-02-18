// Adapted from Daniel's main.js file. Added the pursuer object and a test canal (feel free to replace with your own 
// canal object once the canal feature is merged). This Main file is just for testing compatability between the Player
// and Pursuer features.

let oldWindowWidth;
let oldWindowHeight;

let playerMaxHealth = 100;

function setup() {
  frameRate(1);
  //set the canvas size the first time when the program starts
  createCanvas(windowWidth, windowHeight);
  oldWindowWidth = windowWidth;
  oldWindowHeight = windowHeight;

  //to create a player object you need x coordinate, y coordinate, mass of the boat, and the boat speed limit
  // NEW aatributes: startHealth = 90, maxHealth = 100, collisionDamage = 3, damageOverTime = 1 
  player = new Player(width / 2, height / 2, 5, 5, playerMaxHealth);

  // NEW
  healthbar = new HealthBar(10, 20, playerMaxHealth, player);
}

function draw() {
  ResizeCanvas();
  background(200);

  //to make the player model appear on the screen
  player.show();

  // display and update healthbar
  healthbar.draw(); 
}


// create a dinamically resizable canvas
function ResizeCanvas() {
  if (oldWindowWidth != windowWidth || oldWindowHeight != windowHeight){
    createCanvas(windowWidth, windowHeight);
    oldWindowWidth = windowWidth;
    oldWindowHeight = windowHeight;
  }
}
