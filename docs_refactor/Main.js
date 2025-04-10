// Linked below is where we got the boat sprites from.
// https://samifd3f122.itch.io/free-pixel-art-boats?download

// Adapted from Daniel's main.js file. Added the pursuer object and a test canal (feel free to replace with your own
// canal object once the canal feature is merged). This Main file is just for testing compatability between the Player
// and Pursuer features.

/* // Pre-refactor globals
let oldWindowWidth;
let oldWindowHeight;
let c1, c2, c3, c4, c5, c6;
// let b;
const canalWidth = 80;

// Create variables to store sprites
let boatSpritesheet;
let boatJson;
let boatFrames = [];
let pursuerBoatFrames = [];
let waterSpritesheet;
let waterTileFrame;
// Preload sprite images before the program starts
function preload() {
  boatJson = loadJSON("boat.json");
  boatSpritesheet = loadImage("Boat-redbrown.png");
  pursuerBoatSpritesheet = loadImage("Boat-grey.png");
  waterSpritesheet = loadImage("water.png");
  font = loadFont("./Inconsolata.otf");
}

// Player health, collion damage and amount of damage taken over time -
// can be reset at different levels?
let playerMaxHealth = 100;
let playerCollisionDamage = 5;
let playerDamageOverTime = 1;
*/



// Game control flow variable
class GameState {
  static LOAD_SCREEN = "loading screen";
  static START_SCREEN = "start screen";
  static INFO_SCREEN = "information screen";
  static PLAY_GAME = "playing game";
  static WIN = "win screen";
  static LOSE = "lose screen";

  static isValid(state) {
      return [GameState.LOAD_SCREEN, GameState.START_SCREEN, GameState.INFO_SCREEN, GameState.PLAY_GAME,
        GameState.WIN, GameState.LOSE].includes(state);
  }
}
let state = GameState.START_SCREEN; // Starts on loading screen

function setup() {
  new Canvas();
  
  // Instantiate the different screens
  start_screen = new StartScreen();
  info_screen = new InfoScreen();
  game_screen = new GamePlay();
  win_screen = new WinScreen();
  lose_screen = new LoseScreen();
}


function draw() {

  if (state == GameState.START_SCREEN) {
    start_screen.display();
    
  }

  if (state == GameState.INFO_SCREEN) {
    info_screen.display();
    if (keyCode == 32) {
      game_screen.setup();
    }
  }

  if (state == GameState.PLAY_GAME) {
    //if (keyCode === 32) {
    //  game_screen.setup();
    //}
    game_screen.display();
  }

  if (state == GameState.WIN) {
    win_screen.display();
  }

  if (state == GameState.LOSE) {
    lose_screen.display();
  }
  
}

// // create a dinamically resizable canvas
// function ResizeCanvas() {
//   if (oldWindowWidth != windowWidth || oldWindowHeight != windowHeight) {
//     createCanvas(windowWidth, windowHeight);
//     oldWindowWidth = windowWidth;
//     oldWindowHeight = windowHeight;
//   }
// }

/*
// Reset the values of the (gameplay) global variables to their initial values
// (so that the game can restart again after it ends)
function resetVariables() {
  /*
  // Pre-refactor
  waterTileFrame = waterSpritesheet.get(0, 0, 16, 16);
  c1 = new canal(canalWidth, "Starter", 200, 300, 400, 450, waterTileFrame);
  c2 = new canal(canalWidth, "Steep", 250, 350, 330, 600, waterTileFrame);
  c3 = new canal(
    canalWidth,
    "ThirdElement",
    200,
    500,
    550,
    620,
    waterTileFrame
  );
  c4 = new canal(canalWidth, "Uphill", 550, 400, 600, 100, waterTileFrame);
  c5 = new canal(canalWidth, "Crossbar", 600, 150, 100, 150, waterTileFrame);
  c6 = new canal(canalWidth, "victory", 100, 150, 200, 300, waterTileFrame);
  c1.setConnections(c6, c2);
  c2.setConnections(c1, c3);
  c3.setConnections(c2, c4);
  c4.setConnections(c3, c5);
  c5.setConnections(c4, c6);
  c6.setConnections(c5, c1);
  // b = new boat(2, c1, 250, 200, 10, 20);

  //TODO: Create helper function or class in a separate file
  //TODO: called "loadSpriteSheet" that takes in the spritesheet and JSON file
  for (let frame of boatJson.frames) {
    let pos = frame.position;
    let img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    boatFrames.push(img);
    let pursuerImg = pursuerBoatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    pursuerBoatFrames.push(pursuerImg);
  }

  // Instantiate Timer (to time events that occur over time)
  timer = new Timer();
  timer.startTimer();

  //to create a player object you need x coordinate, y coordinate, mass of the boat, the boat speed limit, and the start canal
  player = new Player(
    160,
    320,
    5,
    3,
    c6,
    boatFrames,
    timer,
    playerMaxHealth,
    playerCollisionDamage,
    playerDamageOverTime
  );

  // Instantiate healthbar
  healthbar = new HealthBar(playerMaxHealth, player);

  // canal = new oldCanal(300, 100);
  pursuer = new Pursuer(100, 200, canal, 3, 0.3, pursuerBoatFrames);

  /*

  // Post-refactor
  centreCircle = new CentreCirlce();

  player = new Sprite(100, 100, 50, 25);
  player.addAnimation("boat", boatAnimation);
  player.animation.frameDelay = 18;
  playerCfg = new PlayerConfig(player);

  pursuer = new Sprite(40, 100, 50, 25);
  pursuerCfg = new PursuerConfig(pursuer, player, 3);

  leftBankConstr = [];
  rightBankConstr = [];

  camera.x = player.x;
  camera.y = player.y;

  c1 = new canal(300, 2, 100); //right, up
  c2 = new canal(770, 4.5, 150); //right, down
  c3 = new lock(470, 7, 130); //left, down
  c4 = new canal(600, 10, 220); //left up
  c5 = new canal(400, 9, 60)
  network = new canalNetwork(-50, -350, [c1, c2, c3, c4, c5]);
  
  // TODO: incorporate into new refactor
  // Instantiate Timer (to time events that occur over time)
  //timer = new Timer();
  //timer.startTimer();

  // Instantiate healthbar
  //healthbar = new HealthBar(playerMaxHealth, player);
  
}
  */
