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
  static DIFFICULTY_SCREEN = "difficulty screen";

  static isValid(state) {
      return [GameState.LOAD_SCREEN, GameState.START_SCREEN, GameState.LEVEL_SCREEN, GameState.INFO_SCREEN, 
        GameState.PLAY_GAME, GameState.WIN, GameState.LOSE, GameState.DIFFICULTY_SCREEN].includes(state);
  }
}
let state = GameState.START_SCREEN; // Starts on loading screen

//about the difficulty levels: 
// 0 = easy, 1 = medium, 2 = hard
// if a level does not have a difficulty selection option, the default is set automatically
let selectedLevel = null;
let difficultyLevel = null; 

function setup() {
  new Canvas();
  
  // Instantiate the different screens
  start_screen = new StartScreen();
  level_screen = new LevelScreen();
  info_screen = new InfoScreen();
  game_screen = null;
  win_screen = new WinScreen();
  lose_screen = new LoseScreen();
  difficulty_screen = new DifficultyScreen();
}


function draw() {

  if (state == GameState.START_SCREEN) {
    start_screen.display();
  }

  if (state == GameState.LEVEL_SCREEN) {
    level_screen.display();
  }

  if (state == GameState.DIFFICULTY_SCREEN) {
    difficulty_screen.display();
  }

  if (state == GameState.INFO_SCREEN) {
    selectedLevel = level_screen.getSelectedLevel();
    selectedDifficulty = difficulty_screen.getSelectedDifficulty();
    info_screen.display();
    if (keyCode == 32) {
      print("was here " + selectedDifficulty);
      game_screen = LevelController.getLevel(selectedLevel);
      if (!(selectedDifficulty === -1)) {
        difficultyLevel = difficulty_screen.getSelectedDifficulty();
      } else {
        difficultyLevel = 0; //i.e. the default seleciton
      }
      difficulty_screen.resetSelectedDifficulty();
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
