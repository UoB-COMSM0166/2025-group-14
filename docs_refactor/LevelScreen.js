class LevelScreen {

    constructor() {
        this.tutorialButton = new Button("Tutorial", windowWidth/6, windowHeight/6, 'seagreen', 30, this.buttonClick.bind(this));
        this.tutorialButton.hide();
    }

    display() {
        new Canvas(windowWidth, windowHeight);
        //background("lightblue");
        background(183, 233, 193);
        
        if (state === GameState.LEVEL_SCREEN) {
            this.tutorialButton.show(); 
            this.tutorialButton.setPosition(windowWidth / 6, windowHeight / 6);
        } else {
            this.tutorialButton.button.hide(); 
        }

        // Transition to gameplay screen when player presses the SPACE key
        if (state === GameState.INFO_SCREEN && keyCode == 32) {
          state = GameState.PLAY_GAME;
        }
    }

    buttonClick() {
        console.log("Button clicked!");
    }
}