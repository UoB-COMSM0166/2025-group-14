class Tutorial {

    constructor() {

    }

    display() {
        new Canvas(windowWidth, windowHeight);
        background('red');
        // Transition to info screen when player presses the ENTER key
        if (state === GameState.TUTORIAL_LEVEL && keyCode === 13) {
          state = GameState.PLAY_GAME;
        }
    }
}