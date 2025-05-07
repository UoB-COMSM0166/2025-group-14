// Linked below is where we got the boat sprites from.
// https://samifd3f122.itch.io/free-pixel-art-boats?download

// 

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
  //rendition credit JuliusH on pixabay (composed by Edvard Grieg)
  clickSound = loadSound("assets/Sounds/duck_quack_shorter.mp3", () => soundLoadSuccess(clickSound, "duck", 0.1)); 
  //*credit to freesound_community on pixabay
  boatCrashSound = loadSound("assets/Sounds/boat_crash.mp3", () => soundLoadSuccess(boatCrashSound, "boat crash", 1)); //*
  canalWaterSound = loadSound("assets/Sounds/canal_ambience.mp3", () => soundLoadSuccess(canalWaterSound, "canal", 0.3)); //*
  lockSoundFore = loadSound("assets/Sounds/lock_open_close.mp3", () => soundLoadSuccess(lockSoundFore, "lock", 1)); //*
  lockSoundAft = loadSound("assets/Sounds/lock_open_close.mp3", () => soundLoadSuccess(lockSoundAft, "lock", 1)); //*
  engineSound = loadSound("assets/Sounds/engine_noise.mp3", () => soundLoadSuccess(engineSound, "engine", 0.1));
  //credit to spinopel on pixabay
  pursuerEngineSound = loadSound("assets/Sounds/pursuer_engine.mp3", () => soundLoadSuccess(engineSound, "pursuer engine", 0.1)); //*
  repairDrill = loadSound("assets/Sounds/repair_drill.mp3", () => soundLoadSuccess(repairDrill, "repair drill", 1.4)); //*
  repairSaw = loadSound("assets/Sounds/repair_saw.mp3", () => soundLoadSuccess(repairSaw, "repair saw", 0.2));
  // credit to floraphonic on pixabay
  repairHammer = loadSound("assets/Sounds/repair_hammer.mp3", () => soundLoadSuccess(repairHammer, "repair hammer", 0.08)); //*
  collectGarbageSound = loadSound("assets/Sounds/plastic_crunch.mp3", () => soundLoadSuccess(collectGarbageSound, "collect garbage", 0.5)); //*
  shipBreakSound = loadSound("assets/Sounds/ship_breaking.mp3", () => soundLoadSuccess(shipBreakSound, "ship breaking", 0.2)); //*
  winSound = loadSound("assets/Sounds/yay.mp3", () => soundLoadSuccess(winSound, "yay", 0.3)); //*
  wallCollisionSound = loadSound("assets/Sounds/wood_break.mp3", () => soundLoadSuccess(wallCollisionSound, "wall collision", 0.2)); //*
}

//callback function to check when sounds have loaded - sound must be loaded before attempting to play or things break
//also sets the volume level
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
    canalWaterSound.pause();
    engineSound.pause();
    pursuerEngineSound.pause();
  
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
      //difficulty_screen.resetSelectedDifficulty();
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
    if(soundOn && !pursuerEngineSound.isPlaying() && !game_screen.isPaused) {
      pursuerEngineSound.loop();
    } else if (game_screen.isPaused) {
      pursuerEngineSound.pause();
    } 
    game_screen.display();
  }

  if (state == GameState.WIN) {
    win_screen.display();
  }

  if (state == GameState.LOSE) {
    engineSound.pause();
    lose_screen.display();
  }
}
