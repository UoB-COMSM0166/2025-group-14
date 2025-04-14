class LevelScreen {

    constructor() {
        this.selectedLevel = -1; // Default level is -1 (no level selected)
        this.tutorialButton = new Button("Tutorial", windowWidth/6, windowHeight/6, 'seagreen', 30, () => this.selectLevel(0));
        this.tutorialButton.hide();
        this.levelOneButton = new Button("Level 1", windowWidth*2/6, windowHeight/6, 'seagreen', 30, () => this.selectLevel(1));
        this.levelOneButton.hide();
        this.levelTwoButton = new Button("Level 2", windowWidth*3/6, windowHeight/6, 'seagreen', 30, () => this.selectLevel(2));
        this.levelTwoButton.hide();
    }

    display() {
        new Canvas(windowWidth, windowHeight);
        background(183, 233, 193);

        this.tutorialButton.show(); 
        this.levelOneButton.show();
        this.levelTwoButton.show();
        this.tutorialButton.setPosition(windowWidth/6, windowHeight/6);
        this.levelOneButton.setPosition(windowWidth *2/6, windowHeight/6);
        this.levelTwoButton.setPosition(windowWidth *3/6, windowHeight/6);
    
    }

    selectLevel(levelId) {
        this.selectedLevel = levelId;
        this.tutorialButton.hide();
        this.levelOneButton.hide();
        this.levelTwoButton.hide();
        if (this.selectedLevel === 2) {
            state = GameState.DIFFICULTY_SCREEN;
        } else {
            state = GameState.INFO_SCREEN;
        }
        // state = GameState.INFO_SCREEN;
    }

    getSelectedLevel() {
        return this.selectedLevel;
    }

    // resetSelectedLevel() {
    //     this.selectedLevel = -1;
    // }
}