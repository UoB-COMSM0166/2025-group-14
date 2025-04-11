class WinScreen {

    constructor() {

    }

    display() {
        let centerX = windowWidth/2;
        let centerY = windowHeight/2;
        //background("lightblue");
        background(183, 233, 193);
        fill(0);
        textSize(20);
        textAlign(CENTER);
        //text("You win!", (oldWindowWidth/2), (oldWindowHeight/2)-30);
        //text("Press SPACE to play the game again.", oldWindowWidth/2, oldWindowHeight/2);
        text("You win!", centerX, centerY);
        text("Press SPACE to play the game again.", centerX, centerY+30);
        
        // if space key is pressed, go back to start screen.
        if (state === GameState.WIN && keyCode === 32) {
            state = GameState.START_SCREEN;
        }
    }
}