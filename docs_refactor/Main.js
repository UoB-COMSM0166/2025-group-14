// Linked below is where we got the boat sprites from.
// https://samifd3f122.itch.io/free-pixel-art-boats?download

// Adapted from Daniel's main.js file. Added the pursuer object and a test canal (feel free to replace with your own
// canal object once the canal feature is merged). This Main file is just for testing compatability between the Player
// and Pursuer features.

// Game control flow variable
class GameState {
  static LOAD_SCREEN = "loading screen";
  static START_SCREEN = "start screen";
  static LEVEL_SCREEN = "level screen";
  static INFO_SCREEN = "information screen";
  static PLAY_GAME = "playing game";
  static WIN = "win screen";
  static LOSE = "lose screen";

  static isValid(state) {
      return [GameState.LOAD_SCREEN, GameState.START_SCREEN, GameState.LEVEL_SCREEN, GameState.INFO_SCREEN, 
        GameState.PLAY_GAME, GameState.WIN, GameState.LOSE].includes(state);
  }
}
let state = GameState.START_SCREEN; // Starts on loading screen
let selectedLevel = null;

function setup() {
  new Canvas();
  
  // Instantiate the different screens
  start_screen = new StartScreen();
  level_screen = new LevelScreen();
  info_screen = new InfoScreen();
  game_screen = null;
  win_screen = new WinScreen();
  lose_screen = new LoseScreen();
}


function draw() {

  if (state == GameState.START_SCREEN) {
    start_screen.display();
  }

  if (state == GameState.LEVEL_SCREEN) {
    level_screen.display();
  }

  if (state == GameState.INFO_SCREEN) {
    selectedLevel = level_screen.getSelectedLevel();
    info_screen.display();
    if (keyCode == 32) {;
      game_screen = LevelController.getLevel(selectedLevel);
    }
  }

  if (state == GameState.PLAY_GAME) {
    game_screen.display();
  }

  if (state == GameState.WIN) {
    win_screen.display();
  }

  if (state == GameState.LOSE) {
    lose_screen.display();
  }
}
