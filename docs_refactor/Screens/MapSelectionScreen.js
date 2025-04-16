// class LevelScreen {
    
class MapSelectionScreen{
    constructor() {
        this.selectedMapId = -1; // Default map is -1 (no map selected)
        this.tutorialButton = new Button("Tutorial", windowWidth/6, windowHeight/6, 'seagreen', 30, () => this.selectMap(0));
        this.tutorialButton.hide();
        this.mapOneButton = new Button("Map 1", windowWidth*2/6, windowHeight/6, 'seagreen', 30, () => this.selectMap(1));
        this.mapOneButton.hide();
        this.mapTwoButton = new Button("Map 2", windowWidth*3/6, windowHeight/6, 'seagreen', 30, () => this.selectMap(2));
        this.mapTwoButton.hide();
    }

    display() {
        new Canvas(windowWidth, windowHeight);
        background(183, 233, 193);

        this.tutorialButton.show(); 
        this.mapOneButton.show();
        this.mapTwoButton.show();
        this.tutorialButton.setPosition(windowWidth/6, windowHeight/6);
        this.mapOneButton.setPosition(windowWidth *2/6, windowHeight/6);
        this.mapTwoButton.setPosition(windowWidth *3/6, windowHeight/6);
    
    }

    selectMap(mapId) {
        this.selectedMapId = mapId;
        this.tutorialButton.hide();
        this.mapOneButton.hide();
        this.mapTwoButton.hide();
        if (this.selectedMapId === 2) {
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