class InfoScreen {

    constructor() {

    }

    display() {
        //background("lightblue");
        background(183, 233, 193);
        fill(0);
        textSize(20)
        textAlign(CENTER);
        text("...TODO: add some info here...", 0, 0)
        text("Press SPACE to start the game!", 0, 30)
        
        // Transition to gameplay screen when player presses the SPACE key
        if (state === GameState.INFO_SCREEN && keyCode == 32) {
          state = GameState.PLAY_GAME;
        }
    }
}