// class LevelScreen {
    
class MapSelectionScreen{
    constructor() {
        this.selectedMapId = -1; // Default map is -1 (no map selected)
        this.tutorialButton = new Button("Tutorial", windowWidth/4, windowHeight/5, 'seagreen', 30, () => this.selectMap(0), true, 'assets/mapScreenshots/tutorial.png');
        this.tutorialButton.hide();
        this.mapOneButton = new Button("Forkminster", windowWidth*2/4, windowHeight/5, 'seagreen', 30, () => this.selectMap(1), true, 'assets/mapScreenshots/map1.png');
        this.mapOneButton.hide();
        this.mapTwoButton = new Button("Locksbow Crescent", windowWidth*3/4, windowHeight/5, 'seagreen', 30, () => this.selectMap(2), true, 'assets/mapScreenshots/map2.png');
        this.mapTwoButton.hide();
        this.mapThreeButton = new Button("The Hedge Maze", windowWidth/4, windowHeight*3/5, 'seagreen', 30, () => this.selectMap(3), true, 'assets/mapScreenshots/map3.png');
        this.mapThreeButton.hide();
        this.mapFourButton = new Button("Hairpin Hampton", windowWidth*2/4, windowHeight*3/5, 'seagreen', 30, () => this.selectMap(4), true, 'assets/mapScreenshots/map4.png');
        this.mapFourButton.hide();
        this.mapFiveButton = new Button("Snailshell Spiral", windowWidth*3/4, windowHeight*3/5, 'seagreen', 30, () => this.selectMap(5), true, 'assets/mapScreenshots/map5.png');
        this.mapFiveButton.hide();

        this.titleText = "Select a map to play";
        this.titleTextSize = 40;
        this.titleTextX = windowWidth / 2;
        this.titleTextY = windowHeight / 12;
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
        
        textAlign(CENTER);
        textSize(this.titleTextSize);
        stroke(3);
        text(this.titleText, this.titleTextX, this.titleTextY);
        
        this.tutorialButton.setPosition(windowWidth/4, (windowHeight/4)+50);
        this.mapOneButton.setPosition(windowWidth*2/4, (windowHeight/4)+50);
        this.mapTwoButton.setPosition(windowWidth*3/4, (windowHeight/4)+50);
        this.mapThreeButton.setPosition(windowWidth/4, windowHeight*3/4);
        this.mapFourButton.setPosition(windowWidth*2/4, windowHeight*3/4);
        this.mapFiveButton.setPosition(windowWidth*3/4, windowHeight*3/4);
    
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
