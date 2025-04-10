class StartScreen {

    constructor() {
      this.levelButton = new Button("LEVELS", windowWidth / 2, windowHeight / 2 + 150, 'seagreen', 30);
    }

    display() {
        new Canvas(windowWidth, windowHeight);
        //background("lightblue");
        let centerX = windowWidth/2;
        let centerY = windowHeight/2;
        background(183, 233, 193);
        fill(0);
        textSize(20);
        stroke(2);
        textAlign(CENTER);
        text("Welcome to", centerX, centerY-100);
        textSize(50);
        stroke(4);
        text("NARROWBOAT CHASE!", centerX, centerY);
        textSize(20);
        stroke(2);
        //text("Press [ENTER] to start the game!", centerX, centerY+80);

        // Re-initialise the gameplay variables to their starting values
        // (this ensures that the game can be restarted).
        //if (state === GameState.START_SCREEN) {
        //    resetVariables();
       // }
        this.levelButton.setPosition(windowWidth / 2, windowHeight / 2 + 150);
        // Transition to info screen when player presses the ENTER key
        if (state === GameState.START_SCREEN && keyCode === 13) {
          state = GameState.LEVEL_SCREEN;
        }
    }
}
