class DifficultyScreen {

  constructor() {
      this.selectedDifficulty = -1; 
      this.easyButton = new Button("Easy", windowWidth/6, windowHeight/6, 'seagreen', 30, () => this.selectDifficulty(0));
      this.easyButton.hide();
      this.mediumButton = new Button("Medium", windowWidth*2/6, windowHeight/6, 'seagreen', 30, () => this.selectDifficulty(1));
      this.mediumButton.hide();
      this.hardButton = new Button("Hard", windowWidth*3/6, windowHeight/6, 'seagreen', 30, () => this.selectDifficulty(2));
      this.hardButton.hide();
      this.returnButton = new Button("Return to map selection", windowWidth*5/6, windowHeight/6, 'seagreen', 30, () => this.returnToMapSelection());
      this.returnButton.hide();
  }

  display() {
      new Canvas(windowWidth, windowHeight);
      background(183, 233, 193);


      this.easyButton.show(); 
      this.mediumButton.show();
      this.hardButton.show();
      this.returnButton.show();
      this.easyButton.setPosition(windowWidth*3/6, windowHeight/6);
      this.mediumButton.setPosition(windowWidth*3/6, windowHeight*2/6);
      this.hardButton.setPosition(windowWidth *3/6, windowHeight*3/6);
      this.returnButton.setPosition(windowWidth*3/6, windowHeight*4/6);
  
  }

  selectDifficulty(difficultylId) {
      this.selectedDifficulty = difficultylId;
      this.easyButton.hide();
      this.mediumButton.hide();
      this.hardButton.hide();
      this.returnButton.hide();
      state = GameState.INFO_SCREEN;
  }

  getSelectedDifficulty() {
      return this.selectedDifficulty;
  }

  resetSelectedDifficulty() {
    this.selectedDifficulty = -1;
  }

  returnToMapSelection() {
    this.easyButton.hide();
    this.mediumButton.hide();
    this.hardButton.hide();
    this.returnButton.hide();
    state = GameState.MAP_SELECTION_SCREEN;
  }
}

