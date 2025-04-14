class StartScreen {

    constructor() {
      this.levelButton = new Button("LEVELS", windowWidth/2, windowHeight/2 + 150, 'seagreen', 30, this.buttonClick.bind(this));
    }

    display() {
        new Canvas(windowWidth, windowHeight);
        this.levelButton.show(); 
        //background("lightblue");
        let centerX = windowWidth/2;
        let centerY = windowHeight/2;
        background(183, 233, 193);
        fill(0);
        textSize(20);
        stroke(2);
        textAlign(CENTER);
        text("Welcome to", centerX, centerY-100);
        textSize(50);
        stroke(4);
        text("NARROWBOAT CHASE!", centerX, centerY);
        textSize(20);
        stroke(2);
        //update position of button in case of resizing
        this.levelButton.setPosition(windowWidth / 2, windowHeight / 2 + 150);
    }

    // Transition to level screen when player clicks on level button
    buttonClick() {
      console.log("Button clicked!");
      this.levelButton.hide();
      if (state === GameState.START_SCREEN) {
        state = GameState.LEVEL_SCREEN;
      }
  }
}