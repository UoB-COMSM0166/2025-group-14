// Linked below is where we got the boat sprites from.
// https://samifd3f122.itch.io/free-pixel-art-boats?download

// Adapted from Daniel's main.js file. Added the pursuer object and a test canal (feel free to replace with your own
// canal object once the canal feature is merged). This Main file is just for testing compatability between the Player
// and Pursuer features.

let oldWindowWidth;
let oldWindowHeight;


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
  // waterSpritesheet = loadImage("water.png");
  font = loadFont("./Inconsolata.otf");
}

// Player health, collion damage and amount of damage taken over time -
// can be reset at different levels?
let playerMaxHealth = 1000;
let playerCollisionDamage = 5;
let playerDamageOverTime = 1;

function setup() {
  //set the canvas size the first time when the program starts
  createCanvas(windowWidth, windowHeight, WEBGL);
  textFont(font);
  oldWindowWidth = windowWidth;
  oldWindowHeight = windowHeight;

  
  // Instantiate the different screens
  start_screen = new StartScreen();
  info_screen = new InfoScreen();
  game_screen = new GamePlay();
  win_screen = new WinScreen();
  lose_screen = new LoseScreen();
}

function draw() {

  if (state == GameState.START_SCREEN) {
    console.log("startscreen")
    start_screen.display();
  }

  if (state == GameState.INFO_SCREEN) {
    info_screen.display();
  }

  if (state == GameState.PLAY_GAME) {
    console.log("play screen")
    game_screen.display();
  }

  if (state == GameState.WIN) {
    win_screen.display();
  }

  if (state == GameState.LOSE) {
    lose_screen.display();
  }
  
}

// create a dinamically resizable canvas
function ResizeCanvas() {
  if (oldWindowWidth != windowWidth || oldWindowHeight != windowHeight) {
    createCanvas(windowWidth, windowHeight);
    oldWindowWidth = windowWidth;
    oldWindowHeight = windowHeight;
  }
}

// Reset the values of the (gameplay) global variables to their initial values
// (so that the game can restart again after it ends)
function resetVariables() {
  //here: try out creating a new canal with the p5play library

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
    boatFrames,
    timer,
    playerMaxHealth,
    playerCollisionDamage,
    playerDamageOverTime
  );

  // Instantiate healthbar
  healthbar = new HealthBar(playerMaxHealth, player);

  // canal = new oldCanal(300, 100);
  pursuer = new Pursuer(100, 200, 3, 0.3, pursuerBoatFrames);

}
