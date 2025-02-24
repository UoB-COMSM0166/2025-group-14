// Adapted from Daniel's main.js file. Added the pursuer object and a test canal (feel free to replace with your own 
// canal object once the canal feature is merged). This Main file is just for testing compatability between the Player
// and Pursuer features.

let oldWindowWidth;
let oldWindowHeight;
// let b;
let canalWidth = 80;
let LC = new LevelController();
let c1, c2, c3, c4;

function setup() {
  //set the canvas size the first time when the program starts
  createCanvas(windowWidth, windowHeight);
  oldWindowWidth = windowWidth;
  oldWindowHeight = windowHeight;


  // let x = 0
  // let y = innerHeight / 2
  // let third = innerWidth / 3

  // this.canals.push(new canal(canalWidth, "0", x, y, x + windowThird, y));
  // this.canals.push(new canal(canalWidth, "1", x + windowThird, y, x + (2 * windowThird), y + 50));
  // this.canals.push(new canal(canalWidth, "2", x + (2 * windowThird), y + 50, innerWidth, y));
  // this.canals.push(new canal(canalWidth, "dummy", innerWidth, y, innerWidth + windowThird, y));

  // this.canals[0].setConnections(null, this.canals[1]);
  // this.canals[1].setConnections(this.canals[0], this.canals[2]);
  // this.canals[2].setConnections(this.canals[1], this.canals[3]);
  // this.canals[3].setConnections(this.canals[2], null);

  // let x = 0
  // let y = innerHeight / 2
  // let third = innerWidth / 3

  // c1 = new canal(canalWidth, "0", x, y, x + third, y);
  // c2 = new canal(canalWidth, "1", x + third, y, x + (2 * third), y + 50);
  // c3 = new canal(canalWidth, "2", x + (2 * third), y + 50, innerWidth-1, y);
  // // c4 = new canal(canalWidth, "dummy", innerWidth, y, innerWidth + third, y);

  // c1.setConnections(null, c2);
  // c2.setConnections(c1, c3);
  // c3.setConnections(c2, null);
  // // c4.setConnections(c3, null);
  // let start = c1
  // player = new Player(100, innerHeight / 2, 5, 3, start);

  // let start = LC.circularLevel()[0];
  // player = new Player(160, 320, 5, 3, start);

  // let start = LC.levelOne();
  // player = new Player(100, innerHeight / 2, 5, 3, start);

  let start = LC.levelMethods[0]();
  player = new Player(100, innerHeight / 2, 5, 3, start);

  // let start = LC.levelTwo();
  // player = new Player(100, innerHeight / 2, 5, 3, start);


  //to create a player object you need x coordinate, y coordinate, mass of the boat, the boat speed limit, and the start canal 
  // canal = new oldCanal(300, 100);
  // pursuer = new Pursuer(100, 200, canal);
}

function draw() {
  ResizeCanvas();
  background(200);

  player.show(); // visualising Daniil's boat
  LC.show(player.endOfMap);
  // if (player.endOfMap) {
  //   LC.nextLevel();
  // }
  // if (player.endOfMap) {
  //   LC.nextLevel();
  // }

  // // pursuer object appear and behaviour
  // let steering = pursuer.arrive(player);
  // pursuer.applyForce(steering);
  // pursuer.update();
  // pursuer.show();

  //to make the player model appear on the screen
  // c1.visualize();
  // c2.visualize();
  // c3.visualize();
}


// create a dinamically resizable canvas
function ResizeCanvas() {
  if (oldWindowWidth != windowWidth || oldWindowHeight != windowHeight){
    createCanvas(windowWidth, windowHeight);
    oldWindowWidth = windowWidth;
    oldWindowHeight = windowHeight;
  }
}
