// Source of duck assets: https://caz-creates-games.itch.io/ducky-3?download
// Creator: Caz Creates Games

class InfoScreen {

    constructor() {

        this.duck = loadAni(
            'assets/duck_walk1.png',
            'assets/duck_walk2.png',
            'assets/duck_walk3.png',
            'assets/duck_walk4.png',
            'assets/duck_walk5.png',
            'assets/duck_walk6.png'
        );
        
        this.duck.frameDelay = 30;
        this.duck.scale = 3;
        this.textLine1 = "";
        this.textLine2 = "";
        this.textLine3 = "";
        this.textLine4 = "";
        this.textLine5 = "";
        this.textLine6 = "";

        this.returnToMapSelection = new Button("Return to map selection", windowWidth/2, windowHeight*10/12, 'seagreen', 30, this.returnToMapSelectionScreen.bind(this));
        this.returnToMapSelection.hide();
        this.playButton = new Button("Play", windowWidth/2, windowHeight*9/12, 'seagreen', 30, () => this.playGame());
        this.playButton.hide();
    }
    

    display() {
        new Canvas(windowWidth, windowHeight);
        let instructionY = windowHeight*0.25;
        let instructionX = windowWidth*0.05;
        let instructionSpacing = windowHeight*0.1; 
        let instructionBoxWidth = windowWidth*0.9;
        background(183, 233, 193);
        fill(0);
        
        let duckX = windowWidth*0.1;
        let duckY = windowHeight*0.1;
        let duckSpacing = windowWidth*0.1;
        let numberOfDucks = 9;

        this.returnToMapSelection.show();
        this.returnToMapSelection.setPosition(windowWidth/2, windowHeight*11/12);
        this.playButton.show();
        this.playButton.setPosition(windowWidth/2, windowHeight*9/12);

        for (let i = 0; i < numberOfDucks; i++) {
            animation(this.duck, duckX+(i*duckSpacing), duckY);
        }

        textSize(17)
        textAlign(CENTER);
        text(this.textLine1, instructionX, instructionY, instructionBoxWidth);
        text(this.textLine2, instructionX, instructionY + instructionSpacing, instructionBoxWidth);
        text(this.textLine3, instructionX, instructionY + (instructionSpacing*2), instructionBoxWidth);
        text(this.textLine4, instructionX, instructionY + (instructionSpacing*3), instructionBoxWidth);
        text(this.textLine5, instructionX, instructionY + (instructionSpacing*4), instructionBoxWidth);
        text(this.textLine6, instructionX, instructionY + (instructionSpacing*5), instructionBoxWidth);
        
        textAlign(CENTER);
        textSize(30);
        stroke(3);
        
        textSize(10);

        
        // Transition to gameplay screen when player presses the SPACE key
        // I also wanted to a redundant button that the user would click to move 
        // to the next level, but to add this feature main logic should be changed
        // which is not the changes I want to make 2 days before submission
        if (state === GameState.INFO_SCREEN && kb.pressed(' ')) {
            this.returnToMapSelection.hide();
            this.playButton.hide();
            if (!(selectedDifficulty === -1)) {
                difficultyLevel = difficulty_screen.getSelectedDifficulty();
              } else {
                difficultyLevel = 0; //i.e. the default seleciton
              }
              game_screen = LevelController.getLevel(selectedMap);
              map_selection_screen.resetSelectedMapId();
            state = GameState.PLAY_GAME;
        }

        
    }

    //update text with values from InfoTextController
    updateText(mapId) {
        let textArray = InfoTextController.getInfoText(mapId);

        this.textLine1 = textArray[1];
        this.textLine2 = textArray[2];
        this.textLine3 = textArray[3];
        this.textLine4 = textArray[4];
        this.textLine5 = textArray[5];
        this.textLine6 = textArray[6];
    }


    returnToMapSelectionScreen() {
        this.returnToMapSelection.hide();
        this.playButton.hide();
        state = GameState.MAP_SELECTION_SCREEN;
    }

    playGame() {
        this.playButton.hide();
        this.returnToMapSelection.hide();
        if (!(selectedDifficulty === -1)) {
            difficultyLevel = difficulty_screen.getSelectedDifficulty();
          } else {
            difficultyLevel = 0; //i.e. the default seleciton
          }
          game_screen = LevelController.getLevel(selectedMap);
          map_selection_screen.resetSelectedMapId();
        state = GameState.PLAY_GAME;
    }
}
