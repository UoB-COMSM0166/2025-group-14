class DifficultyScreen {

  constructor() {
      this.selectedDifficulty = -1; 
      this.easyButton = new Button("Easy", windowWidth/6, windowHeight/6, 'seagreen', 30, () => this.selectDifficulty(0));
      this.easyButton.hide();
      this.hardButton = new Button("Hard", windowWidth*2/6, windowHeight/6, 'seagreen', 30, () => this.selectDifficulty(2)); //maybe there will also be medium
      this.hardButton.hide();
  }

  display() {
      new Canvas(windowWidth, windowHeight);
      background(183, 233, 193);


      this.easyButton.show(); 
      this.hardButton.show();
      this.easyButton.setPosition(windowWidth/6, windowHeight/6);
      this.hardButton.setPosition(windowWidth *2/6, windowHeight/6);
  
  }

  selectDifficulty(difficultylId) {
      this.selectedDifficulty = difficultylId;
      this.easyButton.hide();
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

