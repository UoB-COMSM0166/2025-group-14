// Linked below is where we got the boat sprites from.
// https://samifd3f122.itch.io/free-pixel-art-boats?download
// duck sound credit to freesound_community on pixabay
// morning mood classical music rendition by JuliusH on pixabay (composed by Edvard Grieg)

// Adapted from Daniel's main.js file. Added the pursuer object and a test canal (feel free to replace with your own
// canal object once the canal feature is merged). This Main file is just for testing compatability between the Player
// and Pursuer features.

// Game control flow variable
class GameState {
  static LOAD_SCREEN = "loading screen";
  static START_SCREEN = "start screen";
  static MAP_SELECTION_SCREEN = "level screen"; //MAP_SELECTION_SCREEN map_selection_screen
  static INFO_SCREEN = "information screen";
  static PLAY_GAME = "playing game";
  static WIN = "win screen";
  static LOSE = "lose screen";
  static DIFFICULTY_SCREEN = "difficulty screen";

  static isValid(state) {
      return [GameState.LOAD_SCREEN, GameState.START_SCREEN, GameState.MAP_SELECTION_SCREEN, GameState.INFO_SCREEN, 
        GameState.PLAY_GAME, GameState.WIN, GameState.LOSE, GameState.DIFFICULTY_SCREEN].includes(state);
  }
}
let state = GameState.START_SCREEN; // Starts on loading screen

//about the difficulty levels: 
// 0 = easy, 1 = medium, 2 = hard
// if a level does not have a difficulty selection option, the default is set automatically
let selectedMap = null;
let difficultyLevel = null; 
let pursuerFreezeFrames = 0;

let soundOn = false;

function setup() {
  new Canvas();
  
  // Instantiate the different screens
  start_screen = new StartScreen();
  map_selection_screen = new MapSelectionScreen();
  info_screen = new InfoScreen();
  game_screen = null;
  win_screen = new WinScreen();
  lose_screen = new LoseScreen();
  difficulty_screen = new DifficultyScreen();

  // Make sounds
  startScreenMusic = loadSound("assets/Sounds/morning-mood-edvard-grieg-juliush.mp3", () => soundLoadSuccess(startScreenMusic, "classical music", 0.4));
  clickSound = loadSound("assets/Sounds/duck_quack_shorter.mp3", () => soundLoadSuccess(clickSound, "duck", 0.1));
  boatCrashSound = loadSound("assets/Sounds/boat_crash.mp3", () => soundLoadSuccess(boatCrashSound, "boat crash", 0.3));
  canalWaterSound = loadSound("assets/Sounds/canal_ambience.mp3", () => soundLoadSuccess(canalWaterSound, "canal", 0.1));
  lockSound = loadSound("assets/Sounds/lock_open_close.mp3", () => soundLoadSuccess(lockSound, "lock", 0.2));
  engineSound = loadSound("assets/Sounds/engine_noise.mp3", () => soundLoadSuccess(engineSound, "engine", 0.2));
}

//callback function to check when sounds have loaded - sound must be loaded before attempting to play or things break
function soundLoadSuccess(sound, soundName, volumeLevel) {
  console.log(soundName + " sound loaded");
  sound.setVolume(volumeLevel);
}

function draw() {

  if (state == GameState.START_SCREEN) {
    start_screen.display();
    if(soundOn && !startScreenMusic.isPlaying()) {
      startScreenMusic.loop();
    } 
    if(!soundOn && startScreenMusic.isPlaying()) {
      startScreenMusic.pause();
    }
    if(canalWaterSound.isPlaying()) {
      canalWaterSound.pause();
    }
  }

  if (state == GameState.MAP_SELECTION_SCREEN) {
    if(soundOn && !startScreenMusic.isPlaying()) {
      startScreenMusic.loop();
    } 
    if(!soundOn && startScreenMusic.isPlaying()) {
      startScreenMusic.pause();
    }
    map_selection_screen.display();
  }

  if (state == GameState.DIFFICULTY_SCREEN) {
    if(soundOn && !startScreenMusic.isPlaying()) {
      startScreenMusic.loop();
    } 
    if(!soundOn && startScreenMusic.isPlaying()) {
      startScreenMusic.pause();
    }
    difficulty_screen.display();
  }

  if (state == GameState.INFO_SCREEN) {
    if(startScreenMusic.isPlaying()) {
      startScreenMusic.pause();
    } 
    if(soundOn && !canalWaterSound.isPlaying()) {
      canalWaterSound.loop();
    } 
    selectedMap = map_selection_screen.getSelectedMapId();
    info_screen.updateText(selectedMap);
    selectedDifficulty = difficulty_screen.getSelectedDifficulty();
    info_screen.display();
    if (kb.pressed(' ')) {
      // print("was here " + selectedDifficulty);
      if (!(selectedDifficulty === -1)) {
        difficultyLevel = difficulty_screen.getSelectedDifficulty();
      } else {
        difficultyLevel = 0; //i.e. the default seleciton
      }
      game_screen = LevelController.getLevel(selectedMap);
      difficulty_screen.resetSelectedDifficulty();
      map_selection_screen.resetSelectedMapId();
    }
  }

  if (state == GameState.PLAY_GAME) {
    if(soundOn && !canalWaterSound.isPlaying() && !game_screen.isPaused) {
      canalWaterSound.loop();
    } else if (game_screen.isPaused) {
      canalWaterSound.pause();
    } 
    if(soundOn && !engineSound.isPlaying() && !game_screen.isPaused) {
      engineSound.loop();
    } else if (game_screen.isPaused) {
      engineSound.pause();
    } 
    game_screen.display();
  }

  if (state == GameState.WIN) {
    win_screen.display();
  }

  if (state == GameState.LOSE) {
    lose_screen.display();
  }
}
