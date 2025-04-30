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
    }
    

    display() {
        new Canvas(windowWidth, windowHeight);
        let instructionY = windowHeight*0.25;
        let instructionX = windowWidth*0.05;
        let instructionSpacing = windowHeight*0.1; 
        let instructionBoxWidth = windowWidth*0.9;
        //background("lightblue");
        background(183, 233, 193);
        fill(0);
        
        let duckX = windowWidth*0.1;
        let duckY = windowHeight*0.1;
        let duckSpacing = windowWidth*0.1;
        let numberOfDucks = 9;

        for (let i = 0; i < numberOfDucks; i++) {
            animation(this.duck, duckX+(i*duckSpacing), duckY);
        }

        textSize(17)
        textAlign(LEFT);
        text(this.textLine1, instructionX, instructionY, instructionBoxWidth);
        text(this.textLine2, instructionX, instructionY + instructionSpacing, instructionBoxWidth);
        text(this.textLine3, instructionX, instructionY + (instructionSpacing*2), instructionBoxWidth);
        text(this.textLine4, instructionX, instructionY + (instructionSpacing*3), instructionBoxWidth);
        text(this.textLine5, instructionX, instructionY + (instructionSpacing*4), instructionBoxWidth);
        text(this.textLine6, instructionX, instructionY + (instructionSpacing*5), instructionBoxWidth);
        
        textAlign(CENTER);
        textSize(30);
        stroke(3);
        text("Press [SPACE] to continue", windowWidth/2, instructionY+(instructionSpacing*6.5));
        
        textSize(10);
        // Transition to gameplay screen when player presses the SPACE key
        if (state === GameState.INFO_SCREEN && kb.pressed(' ')) {
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

}
