class LevelScreen {

    constructor() {
        this.selectedLevel = -1; // Default level is -1 (no level selected)
        this.tutorialButton = new Button("Tutorial", windowWidth/6, windowHeight/6, 'seagreen', 30, () => this.selectLevel(0));
        this.tutorialButton.hide();
        this.levelOneButton = new Button("Level 1", windowWidth*2/6, windowHeight/6, 'seagreen', 30, () => this.selectLevel(1));
        this.levelOneButton.hide();
    }

    display() {
        new Canvas(windowWidth, windowHeight);
        background(183, 233, 193);

        this.tutorialButton.show(); 
        this.levelOneButton.show();
        this.tutorialButton.setPosition(windowWidth/6, windowHeight/6);
        this.levelOneButton.setPosition(windowWidth *2/6, windowHeight/6);
    
    }

    selectLevel(levelId) {
        this.selectedLevel = levelId;
        this.tutorialButton.hide();
        this.levelOneButton.hide();
        state = GameState.INFO_SCREEN;
    }

    getSelectedLevel() {
        return this.selectedLevel;
    }
}