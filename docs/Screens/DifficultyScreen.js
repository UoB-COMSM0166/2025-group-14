class DifficultyScreen {

  constructor() {
      this.selectedDifficulty = -1; 
      this.easyButton = new Button("Easy", windowWidth/6, windowHeight/6, 'seagreen', 30, () => this.selectDifficulty(0));
      this.easyButton.hide();
      this.mediumButton = new Button("Medium", windowWidth*2/6, windowHeight/6, 'seagreen', 30, () => this.selectDifficulty(1));
      this.mediumButton.hide();
      this.hardButton = new Button("Hard", windowWidth*3/6, windowHeight/6, 'seagreen', 30, () => this.selectDifficulty(2));
      this.hardButton.hide();
  }

  display() {
      new Canvas(windowWidth, windowHeight);
      background(183, 233, 193);


      this.easyButton.show(); 
      this.mediumButton.show();
      this.hardButton.show();
      this.easyButton.setPosition(windowWidth/6, windowHeight/6);
      this.mediumButton.setPosition(windowWidth *2/6, windowHeight/6);
      this.hardButton.setPosition(windowWidth *3/6, windowHeight/6);
  
  }

  selectDifficulty(difficultylId) {
      this.selectedDifficulty = difficultylId;
      this.easyButton.hide();
      this.mediumButton.hide();
      this.hardButton.hide();
      state = GameState.INFO_SCREEN;
  }

  getSelectedDifficulty() {
      return this.selectedDifficulty;
  }

  resetSelectedDifficulty() {
    this.selectedDifficulty = -1;
  }
}

