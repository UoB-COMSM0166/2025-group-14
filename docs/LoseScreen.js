class LoseScreen {

    constructor() {

    }

    display() {
        //background("lightblue");
        background(183, 233, 193);
        fill(0);
        textSize(20)
        textAlign(CENTER);
        //text("You lose..", (oldWindowWidth/2), (oldWindowHeight/2)-30);
        //text("Press SPACE to play the game again.", oldWindowWidth/2, oldWindowHeight/2);
        text("You lose...", 0, 0);
        text("Press SPACE to play the game again.",0, 30);
        
        // if space key is pressed, go back to start screen.
        if (state === GameState.LOSE && keyCode === 32) {
            state = GameState.START_SCREEN;
        }
    }
}