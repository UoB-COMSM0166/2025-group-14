// Adapted from Daniel's main.js file. Added the pursuer object and a test canal (feel free to replace with your own 
// canal object once the canal feature is merged). This Main file is just for testing compatability between the Player
// and Pursuer features.

let oldWindowWidth;
let oldWindowHeight;
// let b;
let LC = new LevelController();

function setup() {
  //set the canvas size the first time when the program starts
  createCanvas(windowWidth, windowHeight);
  oldWindowWidth = windowWidth;
  oldWindowHeight = windowHeight;

  //to create a player object you need x coordinate, y coordinate, mass of the boat, the boat speed limit, and the start canal 
  // // circular map
  // let start = LC.circularLevel();
  // player = new Player(160, 320, 5, 3, start);

  let start = LC.levelOne();
  player = new Player(100, innerHeight / 2, 5, 3, start);

  // let start = LC.generatedLevel();
  // player = new Player(100, innerHeight / 2, 5, 3, start);

  pursuer = new Pursuer(100, innerHeight / 2, start);
}

function draw() {
  ResizeCanvas();
  background(200);

  player.show(); // visualising Daniil's boat
  LC.show();


  if (player.getCoordinates().x > windowWidth-1) {
    LC.nextLevel()
    player.nextLevel();
    let currentLevel = LC.getCurrentLevel();
    player.setLevel(currentLevel);
  }

  let target = pursuer.setTarget(player);
  let steering = pursuer.arrive(player, target);
  pursuer.applyForce(steering);
  pursuer.update(target);
  pursuer.show(player);
}


// create a dinamically resizable canvas
function ResizeCanvas() {
  if (oldWindowWidth != windowWidth || oldWindowHeight != windowHeight){
    createCanvas(windowWidth, windowHeight);
    oldWindowWidth = windowWidth;
    oldWindowHeight = windowHeight;
  }
}
