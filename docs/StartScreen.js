class StartScreen {

    constructor() {

    }

    display() {
        //background("lightblue");
        background(183, 233, 193);
        fill(0);
        textSize(20)
        textAlign(CENTER);
        text("Welcome to the Narrowboat Chase Game!", 0, 0)
        text("Press ENTER to start the game!", 0, 30);

        // Re-initialise the gameplay variables to their starting values
        // (this ensures that the game can be restarted).
        if (state === GameState.START_SCREEN) {
            resetVariables();
        }
        
        // Transition to info screen when player presses the ENTER key
        if (state === GameState.START_SCREEN && keyCode === 13) {
          state = GameState.INFO_SCREEN;
        }
    }
}