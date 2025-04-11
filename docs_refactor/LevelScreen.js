class LevelScreen {

    constructor() {
        this.selectedLevel = -1; // Default level is -1 (no level selected)
        this.tutorialButton = new Button("Tutorial", windowWidth/6, windowHeight/6, 'seagreen', 30, () => this.selectLevel(0));
        this.tutorialButton.hide();
        this.levelOne = new Button("Level 1", windowWidth*2/6, windowHeight/6, 'seagreen', 30, () => this.selectLevel(1));
        this.levelOne.hide();
    }

    display() {
        background(183, 233, 193);
        
        if (state === GameState.LEVEL_SCREEN) {
            this.tutorialButton.show(); 
            this.levelOne.show();
            this.tutorialButton.setPosition(windowWidth / 6, windowHeight / 6);
        } else {
            this.tutorialButton.button.hide(); 
        }
    }

    selectLevel(levelId) {
        this.selectedLevel = levelId;
        this.tutorialButton.hide();
        this.levelOne.hide();
        state = GameState.INFO_SCREEN;
    }

    getSelectedLevel() {
        return this.selectedLevel;
    }
}