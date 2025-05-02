// class LevelScreen {
    
class MapSelectionScreen{
    constructor() {
        this.selectedMapId = -1; // Default map is -1 (no map selected)
        this.tutorialButton = new Button("Tutorial", windowWidth/4, windowHeight/5, 'seagreen', 30, () => this.selectMap(0));
        this.tutorialButton.hide();
        this.mapOneButton = new Button("Map 1", windowWidth*2/4, windowHeight/5, 'seagreen', 30, () => this.selectMap(1));
        this.mapOneButton.hide();
        this.mapTwoButton = new Button("Map 2", windowWidth*3/4, windowHeight/5, 'seagreen', 30, () => this.selectMap(2));
        this.mapTwoButton.hide();
        this.mapThreeButton = new Button("Map 3", windowWidth/4, windowHeight*3/5, 'seagreen', 30, () => this.selectMap(3));
        this.mapThreeButton.hide();
        this.mapFourButton = new Button("Map 4", windowWidth*2/4, windowHeight*3/5, 'seagreen', 30, () => this.selectMap(4));
        this.mapFourButton.hide();
        this.mapFiveButton = new Button("Map 5", windowWidth*3/4, windowHeight*3/5, 'seagreen', 30, () => this.selectMap(5));
        this.mapFiveButton.hide();
    }

    display() {
        new Canvas(windowWidth, windowHeight);
        background(183, 233, 193);

        this.tutorialButton.show(); 
        this.mapOneButton.show();
        this.mapTwoButton.show();
        this.mapThreeButton.show();
        this.mapFourButton.show();
        this.mapFiveButton.show();
        this.tutorialButton.setPosition(windowWidth/4, windowHeight/5);
        this.mapOneButton.setPosition(windowWidth*2/4, windowHeight/5);
        this.mapTwoButton.setPosition(windowWidth*3/4, windowHeight/5);
        this.mapThreeButton.setPosition(windowWidth/4, windowHeight*3/5);
        this.mapFourButton.setPosition(windowWidth*2/4, windowHeight*3/5);
        this.mapFiveButton.setPosition(windowWidth*3/4, windowHeight*3/5);
    
    }

    selectMap(mapId) {
        this.selectedMapId = mapId;
        this.tutorialButton.hide();
        this.mapOneButton.hide();
        this.mapTwoButton.hide();
        this.mapThreeButton.hide();
        this.mapFourButton.hide();
        this.mapFiveButton.hide();
        if (this.selectedMapId !== 0) {
            state = GameState.DIFFICULTY_SCREEN;
        } else {
            state = GameState.INFO_SCREEN;
        }
        // state = GameState.INFO_SCREEN;
    }

    getSelectedMapId() {
        return this.selectedMapId;
    }

    resetSelectedMapId() {
        this.selectedMapId = -1;
    }
}