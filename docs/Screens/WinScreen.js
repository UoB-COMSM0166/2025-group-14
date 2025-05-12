class WinScreen {

    constructor() {
        this.playAgainButton = new Button("Play again", windowWidth/4, windowHeight*2/3 + 20, 'seagreen', 30, this.playAgainClick.bind(this));
        this.playAgainButton.hide();
        this.nextGameButton = new Button("Next map", windowWidth*2/4, windowHeight*2/3 + 100, 'seagreen', 30, this.nextGameClick.bind(this));
        this.nextGameButton.hide();
        // this button adds redundant functionality of pressing ESC, but I just thought its more intuitive that way
        this.exitButton = new Button("Exit game", windowWidth*3/4, windowHeight*2/3 + 100, 'seagreen', 30, this.exitToStartScreen.bind(this));
        this.exitButton.hide();
    }

    display() {
        let centerX = windowWidth/2;
        let centerY = windowHeight/2;
        //background("lightblue");
        this.playAgainButton.show();
        this.playAgainButton.setPosition(windowWidth/2, windowHeight*2/3 + 20);
        if (selectedMap < 5  && selectedMap > 0) {
            this.nextGameButton.show();
            this.nextGameButton.setPosition(windowWidth/2, windowHeight*2/3 + 100);
        }
        this.exitButton.show();
        this.exitButton.setPosition(windowWidth/2, windowHeight/3);
        background(183, 233, 193);
        fill(0);
        textSize(20);
        textAlign(CENTER);
        //text("You win!", (oldWindowWidth/2), (oldWindowHeight/2)-30);
        //text("Press SPACE to play the game again.", oldWindowWidth/2, oldWindowHeight/2);
        text("You win!", centerX, centerY);
        text("Press esc to return to the start menu.", centerX, centerY+30);
        
        // if space key is pressed, go back to start screen.
        if (state === GameState.WIN &&  kb.pressed('Escape')) {
            this.nextGameButton.hide();
            this.playAgainButton.hide();
            this.exitButton.hide();
            state = GameState.START_SCREEN;
        }
    }

    nextGameClick() {
        this.nextGameButton.hide();
        this.playAgainButton.hide();
        this.exitButton.hide();
        selectedMap++;
        pursuerFreezeFrames = 0;
        if (state === GameState.WIN) {
            game_screen = LevelController.getLevel(selectedMap);
            state = GameState.PLAY_GAME;
        }
    }

    playAgainClick() {
        this.nextGameButton.hide();
        this.playAgainButton.hide();
        this.exitButton.hide();
        pursuerFreezeFrames = 0;
        if (state === GameState.WIN) {
            game_screen = LevelController.getLevel(selectedMap);
            state = GameState.PLAY_GAME;
        }
    }

    exitToStartScreen() {
        this.nextGameButton.hide();
        this.playAgainButton.hide();
        this.exitButton.hide();
        state = GameState.START_SCREEN;
    }
}